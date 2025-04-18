import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Upload from "../../composants/Upload.jsx";
import UploadColors from "../../composants/UploadColors.jsx";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";
import { toast } from "react-toastify";

function ModifierTelephone({ qrCodeData, onClose, onUpdate }) {
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

  const initialPhone = data?.tel || "";

  const [phone, setPhone] = useState(initialPhone); // init à vide
  const [nom, setNom] = useState(initialNom);
  const [color, setColor] = useState(initialColor);
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [imageInt, setImageInt] = useState(initialImageInt);
  const [logoTaille, setLogoTaille] = useState(initialLogoTaille);
  const [qrValue, setQrValue] = useState(initialPhone);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [isImageUpdating, setIsImageUpdating] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const qrRef = useRef(null);

  useEffect(() => {
    setPhone(initialPhone); // ✅ maintenant prérempli
  }, [initialPhone]);

  useEffect(() => {
    setQrValue(phone);
  }, [phone, color, bgColor, imageInt, logoTaille]);

  useEffect(() => {
    const isModified =
      phone !== initialPhone ||
      nom !== initialNom ||
      color !== initialColor ||
      bgColor !== initialBgColor ||
      imageInt !== initialImageInt ||
      logoTaille !== initialLogoTaille;

    setHasChanged(isModified);
  }, [phone, nom, color, bgColor, imageInt, logoTaille]);

  const handleColorChange = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newSize) => {
    setImageInt(newImage);
    setLogoTaille(newSize);
  };

  const regexPhone = /^\+?[1-9][0-9]{7,14}$/;
  const phoneValid = regexPhone.test(phone);

  const handleUpdate = () => {
    if (!phone.trim()) {
      toast.warning("Le numéro de téléphone ne peut pas être vide.");
      return;
    }
    if (!phoneValid) {
      toast.warning("Numéro de téléphone invalide.");
      return;
    }

    setIsUpdating(true);
    setIsImageUpdating(true);

    setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("userId"));
        formData.append("type", "tel");
        formData.append("data[tel]", phone); // <-- ici aussi, tu avais mis `tel`, qui n'est pas défini
        formData.append("customization[color]", color);
        formData.append("customization[bgColor]", bgColor);
        formData.append("customization[imageInt]", imageInt);
        formData.append("customization[logoTaille]", logoTaille);
        formData.append("nom", nom || "Sans nom");
        formData.append("date_modification", new Date().toISOString());
        formData.append("png_file", blob, `${nom || "qr"}_${Date.now()}.png`);
    
        // ✅ Affiche toutes les données envoyées
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": ", pair[1]);
        }
    
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
          setImageTimestamp(Date.now());
    
          setTimeout(() => {
            // window.location.reload();
          }, 1500);
        } catch (err) {
          toast.error("Erreur lors de la mise à jour");
          console.error(err);
        } finally {
          setIsUpdating(false);
          setIsImageUpdating(false);
        }
      }, "image/png");
    }, 2000);
  };    

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Modifier QR Code Téléphone</h2>

      <PhoneInput
        defaultCountry="fr"
        value={phone}
        onChange={(val) => setPhone(val)}
        className="w-full"
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

export default ModifierTelephone;
