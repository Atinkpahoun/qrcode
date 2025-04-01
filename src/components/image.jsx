import { useState } from "react";
import {QRCodeSVG} from "qrcode.react";

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
        "https://api.cloudinary.com/v1_1/dnmnqtqx2/image/upload", // Remplacez par votre Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
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

  // Fonction pour générer le QR Code
  const generateQRCode = () => {
    if (imageUrl) {
      setQrData(imageUrl);
    }
  };

  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
      <form className="flex flex-col items-start ">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Image</h1>
        {/* Input pour sélectionner l'image */}
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* Afficher l'image sélectionnée */}
        {image && <img src={image} alt="Aperçu" className="w-40 h-40 object-cover rounded-lg" />}

        {/* Bouton pour générer le QR Code */}
        {imageUrl && (
          <button
          onClick={generateQRCode}
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          >
            Générer le QR Code
          </button>
        )}
      </form>
      

      {/* QR Code généré */}
      {qrData && (
        <div className="p-4 border rounded-lg">
          <QRCodeSVG value={qrData} size={150} />
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
