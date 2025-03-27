import { useState } from "react";
import QRCode from "qrcode.react";

const QRGenerator = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [qrData, setQrData] = useState("");

  // Fonction pour uploader l'image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr"); // Remplacez par votre upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/votre_cloud_name/image/upload", // Remplacez par votre Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
      setQrData(data.secure_url); // Génère le QR avec l'URL de l'image
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  // Gestion du fichier sélectionné
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Afficher l'image sélectionnée
      uploadImage(file); // Uploader sur Cloudinary
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Input pour sélectionner l'image */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Afficher l'image sélectionnée */}
      {image && <img src={image} alt="Aperçu" className="w-40 h-40 object-cover rounded-lg" />}

      {/* QR Code généré */}
      {qrData && (
        <div className="p-4 border rounded-lg">
          <QRCode value={qrData} size={150} />
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
