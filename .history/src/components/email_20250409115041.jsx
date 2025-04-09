import React, { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";

const Email = () => {
  const [email, setEmail] = useState("");
  const [tempSubject, setTempSubject] = useState("");
  const [tempBody, setTempBody] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState(35);

  const [qrValue, setQrValue] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");
  const [error, setError] = useState("");
  const successMsg ="";

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const generateMailtoLink = () => {
    if (!email) return "";
    return `mailto:${qrValue}?subject=${encodeURIComponent(
      tempSubject
    )}&body=${encodeURIComponent(tempBody)}`;
  };

  const handleColorChange = (newColor, newBgColor) => {
    setTempColor(newColor);
    setTempBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);
  };

  const enregistrerQRCode = async (emailSave, custom, nom) => {
    const { color, bgColor, imageInt, logoTaille } = custom;
  
    // Récupérer le token de l'utilisateur connecté
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Aucun utilisateur connecté. QR Code non enregistré.");
      return;
    }
  
    try {
      // Appel pour récupérer l'utilisateur connecté
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
  
      // Récupérer l'ID de l'utilisateur
      const userData = await userResponse.json();
      const userId = userData.id;
  
      // Ensuite, on peut faire l'enregistrement du QR Code
      const response = await fetch(`${import.meta.env.VITE_API_URL}/qrcodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          type: "email",
          data: {
            email: emailSave,
          },
          customization: {
            color,
            bgColor,
            imageInt,
            logoTaille,
          },
          nom,
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
  
  const handleClick = (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Adresse Mail invalide !");
      setQrValue("");
      return;
    }
  
    setError("");
    setQrValue(email);
    setTempSubject(subject);
    setTempBody(body);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
  
    enregistrerQRCode(email, {
      color: tempColor,
      bgColor: tempBgColor,
      imageInt: tempImageInt,
      logoTaille: tempLogoTaille,
    }, leNom);
  };
  

  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10">
      <form className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Email</h1>
        <input
          type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />

        {error && <p className="text-red-500">{error}</p>}
        {successMsg && <p className="text-blue-500">{successMsg}</p>}

        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />
        <input
          type="text"
          placeholder="Message"
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          onClick={handleClick}
        >
          Générer QR Code
        </button>
      </form>

      <div className="bg-blue-50 rounded-2xl space-y-5 p-4 h-1/2">
        {/* QR Code visible */}
        <div ref={qrSvgRef} className="p-4 rounded-lg">
          {qrValue && (
            <QRCodeSVG
              value={generateMailtoLink()}
              size={170}
              fgColor={color}
              bgColor={bgColor}
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

        {/* QR Code caché pour le téléchargement */}
        <div ref={qrRef} className="hidden">
          {qrValue && (
            <QRCodeCanvas
              value={generateMailtoLink()}
              size={170}
              fgColor={color}
              bgColor={bgColor}
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

        {qrValue && (
          <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
        )}

        <UploadColors onColorChange={handleColorChange} />
        <Upload onLogoChange={handleLogoChange} />

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

export default Email;
