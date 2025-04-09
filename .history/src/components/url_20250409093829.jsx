import React from "react";
import { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";

function Url() {
  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

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
    setTempColor(newColor);
    setTempBgColor(newBgColor);
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
          user_id: 1,
          type: "url",
          data: {
            url: qrValue,
          },
          customization: {
            color: tempColor,
            bgColor: tempBgColor,
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
    setQrValue(url);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);

      
    saveQrCode();
  };

  return (
    <section>
      <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
        <form className="flex flex-col items-center md:items-start" action="">
          <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Lien/URL</h1>
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
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          >
            Générer QRCode
          </button>
        </form>


        <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
          <div  ref={qrSvgRef}>
            {qrValue && (
              <div>
                <QRCodeSVG
                  value={qrValue}
                  fgColor={color}
                  bgColor={bgColor}
                  size={170}
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
          <div ref={qrRef} className="hidden">
            {qrValue && (
              <div>
                <QRCodeCanvas
                  value={qrValue}
                  fgColor={color}
                  bgColor={bgColor}
                  size={170}
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
          
        </div>
      </div>
    </section>
  );
}

export default Url;