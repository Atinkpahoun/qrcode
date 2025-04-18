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
  const [isGenerating, setIsGenerating] = useState(false); // Ajout de isGenerating

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
    if (!texte) {
      toast.error("Veuillez entrer un texte.");
      return;
    }
    
    setLoading(true);
    setShowQr(false);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
    setQrValue(texte);
    setIsGenerating(true); // Démarrer la génération

    setTimeout(() => {
      setShowQr(true);
      setLoading(false);
      setIsGenerating(false); // Fin de la génération
    }, 3000);
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
    <div className="flex flex-wrap justify-center gap-y-5 gap-x-20 doto pt-2 lg:pt-5">
      <form className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Texte</h1>
        <input
          type="text"
          placeholder="Entrez le texte"
          value={texte}
          className="border-[#0000FF] border p-2 rounded-md w-72 lg:w-80 mb-2 ml-4 md:ml-0 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
          onChange={(e) => setTexte(e.target.value)}
        />

        <button
          onClick={handleClick}
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
        >
          Générer CodeQR
        </button>
      </form>

      <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
        <div ref={qrSvgRef}>
          {isGenerating && (
            <div className="flex items-center justify-center h-[250px]">
              <div className="loader-spinner"></div>
            </div>
          )}
          {qrValue && !isGenerating && (
            <div className="p-4 border border-[#0000FF] rounded-lg">
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
            <QRCodeCanvas
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
                      width: logoTaille,
                      excavate: true,
                    }
                  : undefined
              }
            />
          )}
        </div>

        {qrValue && <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />}
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
      </div>
    </div>
  );
}

export default Texte;
