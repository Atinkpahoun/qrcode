import React, { useRef, useState, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import UploadColors from "../composants/UploadColors";
import UploadMenu from "../composants/Upload";
import DownloadQR from "../composants/DownloadQR";
import axios from "axios";
import { toast } from "react-toastify";

function Texte() {
  const [texte, setTexte] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");

  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [showQr, setShowQr] = useState(false);
  const [loading, setLoading] = useState(false);

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  const handleColorChange = (newColor, newBgColor) => {
    setTempColor(newColor);
    setTempBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowQr(false);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
    setQrValue(texte);

    setTimeout(() => {
      setShowQr(true);
      setLoading(false);
    }, 3000); // ⏱️ 3 secondes avant d'afficher le QR
  };

  useEffect(() => {
    if (!qrValue || !qrRef.current || !showQr) return;

    const timeout = setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) {
        console.error("Canvas non trouvé !");
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Erreur de conversion en blob.");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token manquant !");
          return;
        }

        try {
          const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) throw new Error("Impossible de récupérer l'utilisateur");

          const userData = await userResponse.json();

          const formData = new FormData();
          formData.append("user_id", userData.id);
          formData.append("type", "texte");
          formData.append("data[texte]", texte);
          formData.append("customization[color]", color);
          formData.append("customization[bgColor]", bgColor);
          formData.append("customization[imageInt]", imageInt);
          formData.append("nom", leNom || "Sans nom");
          formData.append("date_creation", new Date().toISOString());
          formData.append("png_file", blob, `${leNom || "qr"}_${Date.now()}.png`);

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/qrcodes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("QR Code texte enregistré :", response.data);
          toast.success("QR Code texte enregistré !");
        } catch (error) {
          console.error("Erreur :", error);
          toast.error("Erreur lors de l'enregistrement du QR Code.");
        }
      }, "image/png");
    }, 300);

    return () => clearTimeout(timeout);
  }, [qrValue, showQr]);

  return (
    <div>
      <form>
        <input
          type="text"
          value={texte}
          className="border p-2 rounded-md w-80 mb-4"
          placeholder="Entrez le texte à encoder"
          onChange={(e) => setTexte(e.target.value)}
        />

        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              QR en cours de génération...
            </>
          ) : (
            "Générer QR Code"
          )}
        </button>
      </form>

      <div ref={qrSvgRef}>
        {qrValue && showQr && (
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
        )}
      </div>

      <div ref={qrRef} className="hidden">
        {qrValue && showQr && (
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
        )}
      </div>

      <UploadColors onColorChange={handleColorChange} />
      <UploadMenu onLogoChange={handleLogoChange} />

      <div>
        <input
          placeholder="Donnez un nom au code"
          type="text"
          name="nomcode"
          className="border p-2 w-54 border-[#0000FF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
          onChange={(e) => setLeNom(e.target.value)}
        />
      </div>

      {qrValue && showQr && (
        <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
      )}
    </div>
  );
}

export default Texte;
