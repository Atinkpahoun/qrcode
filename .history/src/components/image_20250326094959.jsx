import { useState } from "react";
import {QRCodeSVG} from "qrcode.react";

const QRGenerator = () => {
  const [images, setImages] = useState([]); // Stocke les images locales
  const [imageUrls, setImageUrls] = useState([]); // Stocke les URLs Cloudinary
  const [qrDataList, setQrDataList] = useState([]); // Stocke les QR Codes

  // Fonction pour uploader une image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr"); // Remplace par ton upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnmnqtqx2/image/upload", // Remplace par ton Cloud Name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrls((prevUrls) => [...prevUrls, data.secure_url]); // Ajoute l'URL à la liste
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  // Gestion du fichier sélectionné
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setImages((prevImages) => [...prevImages, URL.createObjectURL(file)]); // Ajoute l'aperçu local
      uploadImage(file); // Upload l’image sur Cloudinary
    });
  };

  // Fonction pour générer les QR Codes
  const generateQRCode = () => {
    setQrDataList(imageUrls); // Génère un QR Code pour chaque URL Cloudinary
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Input pour sélectionner plusieurs images */}
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />

      {/* Affichage des images sélectionnées */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg" />
        ))}
      </div>

      {/* Bouton pour générer les QR Codes */}
      {imageUrls.length > 0 && (
        <button
          onClick={generateQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Générer les QR Codes
        </button>
      )}

      {/* Affichage des QR Codes */}
      <div className="grid grid-cols-2 gap-4">
        {qrDataList.map((url, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <QRCode value={url} size={150} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRGenerator;
