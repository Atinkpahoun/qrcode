import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Upload from "../../composants/Upload.jsx";
import UploadColors from "../../composants/UploadColors.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function ModifierImage({ qrCodeData, onClose, onUpdate }) {
  if (!qrCodeData) {
    return <div className="p-4 text-center text-gray-500">Chargement...</div>;
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

  const initialImageUrl = data?.image_url || "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [nom, setNom] = useState(initialNom);
  const [color, setColor] = useState(initialColor);
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [imageInt, setImageInt] = useState(initialImageInt);
  const [logoTaille, setLogoTaille] = useState(initialLogoTaille);
  const [qrValue, setQrValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [isImageUpdating, setIsImageUpdating] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [imagePath, setImagePath] = useState(png_file_path);

  const qrRef = useRef(null);

  useEffect(() => {
    setQrValue(imageUrl);
  }, [imageUrl, color, bgColor, imageInt, logoTaille]);

  useEffect(() => {
    const isModified =
      imageUrl !== initialImageUrl ||
      nom !== initialNom ||
      color !== initialColor ||
      bgColor !== initialBgColor ||
      imageInt !== initialImageInt ||
      logoTaille !== initialLogoTaille;

    setHasChanged(isModified);
  }, [imageUrl, nom, color, bgColor, imageInt, logoTaille]);

  const handleColorChange = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newSize) => {
    setImageInt(newImage);
    setLogoTaille(newSize);
  };

  const handleCloudinaryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr");

    try {
      toast.info("Upload de l'image vers Cloudinary...");
      const res = await fetch("https://api.cloudinary.com/v1_1/dnmnqtqx2/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image uploadée sur Cloudinary !");
      } else {
        throw new Error("Upload échoué");
      }
    } catch (err) {
      toast.error("Erreur lors de l'upload Cloudinary");
      console.error(err);
    }
  };

  const handleUpdate = () => {
    if (!imageUrl.trim()) {
      toast.warning("L’URL de l’image est requise.");
      return;
    }

    setIsUpdating(true);
    setIsImageUpdating(true);

    setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("user_id", localStorage.getItem("userId"));
        formData.append("type", "image");
        formData.append("data[image_url]", imageUrl);
        formData.append("customization[color]", color);
        formData.append("customization[bgColor]", bgColor);
        formData.append("customization[imageInt]", imageInt);
        formData.append("customization[logoTaille]", logoTaille);
        formData.append("nom", nom || "Sans nom");
        formData.append("date_modification", new Date().toISOString());
        const fileName = `${nom || "qr"}_${Date.now()}.png`;
        formData.append("png_file", blob, fileName);

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
          setImagePath(`qr_codes/pngs/${fileName}`);
          setImageTimestamp(Date.now());
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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 lg:space-x-10 ">
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl pb-4 font-bold text-[#0000FF]">Modifier QR Code Image</h2>

      {/* Upload image Cloudinary */}
      <div>
        <label className="text-sm font-medium text-gray-700">Changer l’image (Cloudinary)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCloudinaryUpload}
          className="mt-1 block w-full border border-[#0000FF] rounded-md shadow-sm"
        />
      </div>

      {/* Image Cloudinary affichée */}
      <div>
        <label className="text-sm font-medium text-gray-700">Image actuelle (Cloudinary)</label>
        <div className="mt-1 mb-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Image Cloudinary"
              className="w-40 h-40 object-contain border rounded"
            />
          ) : (
            <p className="text-gray-500">Aucune image trouvée.</p>
          )}
        </div>
      </div>

      {/* Nom du QR code */}
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="border p-2 w-96 rounded-md border-[#0000FF]"
        placeholder="Nom du QR Code"
      />

      {/* Personnalisation */}
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
      </div>
      {/* PNG du QR code affiché */}
      <div>
        
        <div className="flex justify-center items-center w-[250px] h-[250px] border rounded-md">
          {isImageUpdating ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/storage/${imagePath}?t=${imageTimestamp}`}
              alt="QR Code PNG"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* QR Code caché pour génération du PNG */}
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
      </div>
      <div className="space-y-2">
      {/* Boutons */}
      <button
        onClick={handleUpdate}
        disabled={!hasChanged || isUpdating}
        className={`w-96 py-2 rounded-md font-semibold text-white ${
          hasChanged && !isUpdating
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isUpdating ? "Mise à jour en cours..." : "Mettre à jour les informations"}
      </button>

      <button
        onClick={onClose}
        className="w-96 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
      >
        Annuler
      </button>
      </div>
    </div>
  );
}

export default ModifierImage;
