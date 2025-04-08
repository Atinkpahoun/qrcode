import React, { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import UploadColors from "../composants/UploadColors";
import UploadMenu from "../composants/Upload";
import DownloadQR from "../composants/DownloadQR";
import axios from "axios";
import { toast } from "react-toastify";

function Texte() {
  const [texte, setTexte] = useState("");
  const [tempColor, setTempColor] = useState("#000000");
  const [tempBgColor, setTempBgColor] = useState("#ffffff");
  const [tempImageInt, setTempImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");

  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [imageInt, setImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

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

  const handleClick = async (e) => {
    e.preventDefault();

    if (!texte.trim() || !leNom.trim()) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    // Mise à jour des valeurs pour affichage
    setQrValue(texte);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);

    // Envoi au backend
    try {
      const token = localStorage.getItem("token"); // Ou récupère depuis ton AuthContext

      const response = await axios.post(
        "http://192.168.1.228:8000/api/qrcode",
        {
          nom: leNom,
          contenu: texte,
          color: tempColor,
          bgColor: tempBgColor,
          logo: tempImageInt || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("QR Code enregistré avec succès !");
      console.log("Réponse backend :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      toast.error("Échec de l'enregistrement du QR Code");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <form onSubmit={handleClick} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Texte à convertir"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          className="border p-2 rounded-md w-80"
        />

        <input
          type="text"
          placeholder="Nom du QR Code"
          value={leNom}
          onChange={(e) => setLeNom(e.target.value)}
          className="border p-2 rounded-md w-80"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Générer et enregistrer
        </button>
      </form>

      {/* Affichage QR visible */}
      <div ref={qrSvgRef}>
        {qrValue && (
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

      {/* QR Code en canvas caché pour téléchargement */}
      <div ref={qrRef} className="hidden">
        {qrValue && (
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

      {qrValue && <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />}
    </div>
  );
}

export default Texte;
