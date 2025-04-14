import React, { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
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
  const [leNom, setLeNom] = useState("");

  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  // Upload de l'image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_preset_qr"); // Remplace par ton preset

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

  // Gestion du fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  // Fonction d'enregistrement dans la base
  const enregistrerQRCode = async (url, options, nom) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aucun utilisateur connecté. QR Code non enregistré.");
      return;
    }
  
    try {
      // Récupération de l'utilisateur connecté
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!userResponse.ok) {
        throw new Error("Impossible de récupérer les infos de l'utilisateur.");
      }
  
      const userData = await userResponse.json();
      const userId = userData.id;
  
      // Enregistrement du QR code
      const response = await fetch(`${import.meta.env.VITE_API_URL}/qrcodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          type: "image",
          data: {
            url: url,
          },
          customization: options,
          nom: nom,
          date_creation: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du QR Code.");
      }
  
      const data = await response.json();
      console.log("QR Code enregistré :", data);
    } catch (error) {
      console.error("Erreur :", error.message);
    }
  };
  
  // Génération du QR Code
  const generateQRCode = async (e) => {
    e.preventDefault();

    if (imageUrl) {
      setQrData(imageUrl);
      setColor(tempColor);
      setBgColor(tempBgColor);
      setImageInt(tempImageInt);
      setLogoTaille(tempLogoTaille);

      await enregistrerQRCode(imageUrl, {
        color: tempColor,
        bgColor: tempBgColor,
        imageInt: tempImageInt,
        logoTaille: tempLogoTaille,
      }, leNom);
    }
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
      <form className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Image</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {image && (
          <img
            src={image}
            alt="Aperçu"
            className="w-40 h-40 object-cover rounded-lg"
          />
        )}
        {imageUrl && (
          <button
            onClick={generateQRCode}
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          >
            Générer le QR Code
          </button>
        )}
      </form>

      <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
        {qrData && (
          <div ref={qrSvgRef} className="p-4 border border-[#0000FF] rounded-lg">
            <QRCodeSVG
              marginSize={2}
              value={qrData}
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
        {qrData && (
          <div ref={qrRef} className="p-4 border rounded-lg hidden">
            <QRCodeCanvas
              marginSize={2}
              value={qrData}
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

        {qrData && (
          <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
        )}

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
};

export default QRGenerator;
