import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Upload from "../../composants/Upload.jsx";
import UploadColors from "../../composants/UploadColors.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function ModifierTexte({ qrCodeData, onClose, onUpdate }) {
  if (!qrCodeData) {
    return (
      <div className="p-4 text-center text-gray-500">
        Chargement des données du QR Code...
      </div>
    );
  }

  const {
    id,
    nom: initialNom,
    data,
    customization: {
      color: initialColor,
      bgColor: initialBgColor,
      imageInt: initialImageInt,
      logoTaille: initialLogoTaille,
    },
    png_file_path,
  } = qrCodeData;

  // ✅ Initialisation correcte AVANT les useState
  const initialTexte = data?.texte || "";

  const [texte, setTexte] = useState(initialTexte);
  const [nom, setNom] = useState(initialNom);
  const [color, setColor] = useState(initialColor);
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [imageInt, setImageInt] = useState(initialImageInt);
  const [logoTaille, setLogoTaille] = useState(initialLogoTaille);
  const [qrValue, setQrValue] = useState(initialTexte);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isImageUpdating, setIsImageUpdating] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const qrRef = useRef(null);

  useEffect(() => {
    setQrValue(texte);
  }, [texte, color, bgColor, imageInt, logoTaille]);

  useEffect(() => {
    const isModified =
      texte !== initialTexte ||
      nom !== initialNom ||
      color !== initialColor ||
      bgColor !== initialBgColor ||
      imageInt !== initialImageInt ||
      logoTaille !== initialLogoTaille;

    setHasChanged(isModified);
  }, [texte, nom, color, bgColor, imageInt, logoTaille]);

  const handleColorChange = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newSize) => {
    setImageInt(newImage);
    setLogoTaille(newSize);
  };

  const texteModifie = texte !== initialTexte;
  const handleUpdate = () => {
    if (texteModifie && !texte.trim()) {
      toast.warning("Le contenu du QR Code ne peut pas être vide.");
      return;
    }

    setIsUpdating(true);

    setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("userId"));
        formData.append("type", "texte");
        formData.append('data[texte]', texte); 
        formData.append("customization[color]", color);
        formData.append("customization[bgColor]", bgColor);
        formData.append("customization[imageInt]", imageInt);
        formData.append("customization[logoTaille]", logoTaille);
        formData.append("nom", nom || "Sans nom");
        formData.append("date_modification", new Date().toISOString());
        formData.append("png_file", blob, `${nom || "qr"}_${Date.now()}.png`);

        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/qrcodes/${id}?_method=PUT`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast.success("QR Code mis à jour !");
          onUpdate();
          setHasChanged(false);
        } catch (err) {
          toast.error("Erreur lors de la mise à jour");
          console.error(err);
        } finally {
          setIsUpdating(false);
        }
      }, "image/png");

      setImageTimestamp(Date.now());
      setIsImageUpdating(false);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Modifier QR Code Texte</h2>

      <textarea
        rows="4"
        required
        className={`border p-2 w-full rounded-md resize-none ${
          !texte.trim() ? "border-red-500" : "border-blue-400"
        }`}
        placeholder="Contenu du QR Code"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />

      <input
        type="text"
        className="border p-2 w-full rounded-md border-blue-400"
        placeholder="Nom du QR Code"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <UploadColors
        initialColor={color}
        initialBgColor={bgColor}
        onColorChange={handleColorChange}
      />

      <Upload
        initialImage={imageInt}
        initialSize={logoTaille}
        onLogoChange={handleLogoChange}
      />

      <div className="flex justify-center items-center w-[250px] h-[250px] border rounded-md">
        {isImageUpdating ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        ) : (
          <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/storage/${png_file_path}?t=${imageTimestamp}`}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div ref={qrRef} className="hidden">
        <QRCodeCanvas
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

      <button
        onClick={handleUpdate}
        disabled={!hasChanged || isUpdating}
        className={`w-full py-2 rounded-md font-semibold text-white ${
          hasChanged && !isUpdating
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isUpdating ? "Mise à jour en cours..." : "Mettre à jour les informations"}
      </button>

      <button
        onClick={onClose}
        className="w-full py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
      >
        Annuler
      </button>
    </div>
  );
}

export default ModifierTexte;
