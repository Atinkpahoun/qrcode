import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";
import { toast } from "react-toastify";
import axios from "axios";

function Url() {
  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const [tempImageInt, setTempImageInt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleColorChange = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);
  };


  const userId = localStorage.getItem('userId');
  const saveQrCode = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/qrcodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
       },
        body: JSON.stringify({
          user_id: userId,
          type: "url",
          data: {
            url: qrValue,
          },
          customization: {
            color: color,
            bgColor: bgColor,
            imageInt: tempImageInt,
            logoTaille: tempLogoTaille,
          },
          nom: leNom,
          date_creation: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du QR Code.");
      }
  
      const data = await response.json();
      console.log("QR Code enregistré :", data);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };  

  const handleClick = (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError("Veuillez entrer une URL valide.");
      return;
    }

    setError("");
    setIsGenerating(true);

    setTimeout(() => {
      setQrValue(url);
      setImageInt(tempImageInt);
      setLogoTaille(tempLogoTaille);
      setIsGenerating(false);
    }, 3000);
  };

  useEffect(() => {
    if (!qrValue || !qrRef.current) return;

    const timeout = setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = await userResponse.json();
          const formData = new FormData();

          formData.append("user_id", userData.id);
          formData.append("type", "url");
          formData.append("data[url]", url);
          formData.append("customization[color]", color);
          formData.append("customization[bgColor]", bgColor);
          formData.append("customization[imageInt]", imageInt);
          formData.append("customization[logoTaille]", logoTaille);
          formData.append("nom", leNom || "Sans nom");
          formData.append("date_creation", new Date().toISOString());
          formData.append("png_file", blob, `${leNom || "qr"}_${Date.now()}.png`);

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/qrcodes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("QR Code URL enregistré :", response.data);
          toast.success("QR Code URL enregistré !");
        } catch (error) {
          toast.error("Erreur lors de l'enregistrement.");
          console.error(error);
        }
      }, "image/png");
    }, 300);

    return () => clearTimeout(timeout);
  }, [qrValue]);

  return (
    <section>
      <div className="flex flex-wrap justify-center gap-y-5 gap-x-20 doto pt-2 lg:pt-5">
        <form className="flex flex-col items-center md:items-start" action="">
          <h1 className="text-3xl font-bold text-[#0000FF] mb-5 md:mb-8">Lien/URL</h1>
          <input
            type="url"
            value={url}
            className={`border-[#0000FF] border p-2 rounded-md w-72 lg:w-80 mb-2 ml-4 md:ml-0 focus:outline-none focus:ring-1 focus:ring-[#0000FF] ${
              error && "border-red-500"
            }`}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Entrez une URL"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleClick}
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4 flex items-center gap-2 disabled:opacity-50"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                QR en cours de génération...
              </>
            ) : (
              "Générer et Enregistrer QR Code"
            )}
          </button>
        </form>

        <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
          <div ref={qrSvgRef}>
            {qrValue && !isGenerating && (
              <div>
                <QRCodeSVG
                  marginSize={2}
                  value={qrValue}
                  fgColor={color}
                  bgColor={bgColor}
                  size={250}
                  level={"H"}
                  imageSettings={
                    imageInt
                      ? {
                          src: imageInt,
                          height: logoTaille,
                          width:logoTaille,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              </div>
            )}
          </div>

          <div ref={qrRef} className="hidden">
            {qrValue && !isGenerating && (
              <div>
                <QRCodeCanvas
                  marginSize={2}
                  value={qrValue}
                  fgColor={color}
                  bgColor={bgColor}
                  size={200}
                  level={"M"}
                  imageSettings={
                    imageInt
                      ? {
                          src: imageInt,
                          height: logoTaille,
                          width: logoTaille,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              </div>
            )}
          </div>

          {qrValue && (
            <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
          )}

          <UploadColors onColorChange={handleColorChange} />
          <Upload onLogoChange={handleLogoChange} />

          <div>
            <input
              placeholder="Donnez un nom au code"
              type="text"
              name="nomcode"
              className="border p-2 w-54 border-[#0000FF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              onChange={(e) => setLeNom(e.target.value)}
            />
          </div>

          {qrValue && !isGenerating && (
            <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Url;
