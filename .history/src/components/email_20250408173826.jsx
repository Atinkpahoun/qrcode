import React from "react";
import { useRef, useState } from "react";
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
    <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
      <form onSubmit={handleClick} className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Email</h1>
        <input
          type="text"
          placeholder="Texte à convertir"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          className="border-[#0000FF] border p-2 rounded-md w-72 lg:w-80 mb-2 ml-4 md:ml-0 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
        />

        <input
          type="text"
          placeholder="Nom du QR Code"
          value={leNom}
          onChange={(e) => setLeNom(e.target.value)}
          className="border-[#0000FF] border p-2 rounded-md w-72 lg:w-80 mb-2 ml-4 md:ml-0 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
        />

        <button
          type="submit"
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
        >
          Générer QRCode
        </button>
      </form>
      <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
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
>>>>>>> abbf94b031f441b5481a08a116aeb1ae6cefac69
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

      {qrValue && <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />}
    </div>
    </div>
  );
}

export default Texte;
