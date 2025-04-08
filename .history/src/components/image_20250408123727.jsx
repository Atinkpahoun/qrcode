import React from "react";
import { useRef, useState } from "react";
import {QRCodeSVG, QRCodeCanvas} from "qrcode.react";
import UploadColors from "../composants/UploadColors";
import UploadMenu from "../composants/Upload";
import DownloadQR from "../composants/DownloadQR";

const QRGenerator = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [qrData, setQrData] = useState("");
  const [color, setColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("")

  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

  const qrRef = useRef(null);
    const qrSvgRef = useRef(null)

  // Fonction pour uploader l'image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr"); // Remplacez par votre upload preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnmnqtqx2/image/upload",
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
  const generateQRCode = (e) => {
    e.
    if (imageUrl) {
      setQrData(imageUrl);
    }
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
  };

  const handleColorChange = (newColor, newBgColor) => {
    setTempColor(newColor);
    setTempBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);

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
        <div ref={qrSvgRef} className="p-4 border rounded-lg">
          <QRCodeSVG
            value={qrData}
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
        </div>
      )}
      {qrData && (
        <div ref={qrRef} className="p-4 border rounded-lg hidden">
          <QRCodeCanvas
            value={qrData}
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
        </div>
      )}

      <UploadColors onColorChange={handleColorChange} />
      <UploadMenu onLogoChange={handleLogoChange} />

      <div>
            <input placeholder="Donnez un nom au code" type="text" name="nomcode" className="border p-2  w-54   border-[#0000FF] rounded-md  focus:outline-none focus:ring-1 focus:ring-[#0000FF]" onChange={(e) => setLeNom(e.target.value)} />
          </div>
          {qrData && (
            <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
          )}
    </div>
  );
};

export default QRGenerator;
