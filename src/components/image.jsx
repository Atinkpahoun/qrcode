import React, { useRef, useState, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import UploadColors from "../composants/UploadColors";
import UploadMenu from "../composants/Upload";
import DownloadQR from "../composants/DownloadQR";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [tempLogoTaille, setTempLogoTaille] = useState(35);

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!imageUrl) return;

    setQrData(imageUrl);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
  };

  useEffect(() => {
    if (!qrData || !qrRef.current) return;

    const timeout = setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");

      if (!canvas) {
        console.error("Canvas non trouvé !");
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Erreur lors de la conversion en blob");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token manquant !");
          return;
        }

        try {
          const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error("Impossible de récupérer l'utilisateur.");
          }

          const userData = await userResponse.json();
          const formData = new FormData();

          formData.append("user_id", userData.id);
          formData.append("type", "image");
          formData.append("data[url]", imageUrl);
          formData.append("customization[color]", color);
          formData.append("customization[bgColor]", bgColor);
          formData.append("customization[imageInt]", imageInt);
          formData.append("nom", leNom || "Sans nom");
          formData.append("date_creation", new Date().toISOString());
          formData.append("png_file", blob, `${leNom || "qr"}_${Date.now()}.png`);

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/qrcodes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("QR Code image enregistré :", response.data);
          toast.success("QR Code image enregistré !");
        } catch (error) {
          if (error.response?.status === 422) {
            const apiErrors = error.response.data.errors;
            console.log("Erreurs Laravel :", apiErrors);
            toast.error("Erreur de validation : " + Object.values(apiErrors).join(", "));
          } else {
            console.error("Erreur :", error.message);
            toast.error("Erreur lors de l'enregistrement du QR Code.");
          }
        }
      }, "image/png");
    }, 300);

    return () => clearTimeout(timeout);
  }, [qrData]);

  const handleColorChange = (newColor, newBgColor) => {
    setTempColor(newColor);
    setTempBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-5 gap-x-20 doto pt-2 lg:pt-5">
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
        
          <button
            onClick={handleGenerate}
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          >
            Générer QRCode
          </button>
        
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
