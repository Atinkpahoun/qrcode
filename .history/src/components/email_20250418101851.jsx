import React, { useRef, useState, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [mailtoLink, setMailtoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [qrReady, setQrReady] = useState(false);


  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  // Génère le lien mailto dynamique
  const generateMailtoLink = () => {
    if (!email) return "";
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);

      const link = generateMailtoLink();
      setIsLoading(true);
  setQrReady(false); // réinitialise l'affichage du QRCode

  // simule un délai de chargement (2s)
  setTimeout(() => {
    setQrValue(email);
    setMailtoLink(link);
    setIsLoading(false);
    setQrReady(true);
    setError("");
  }, 2000);
};
  

  // Enregistrement automatique avec délai après génération
  useEffect(() => {
    if (!mailtoLink || !qrRef.current) return;

    const timeout = setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");

      if (!canvas) {
        toast.error("QR code non généré !");
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Erreur lors de la conversion du QR en image.");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        try {
          const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const user = userRes.data;

          const formData = new FormData();
          formData.append("user_id", user.id);
          formData.append("type", "email");
          formData.append("data[email]", email);
          formData.append("data[subject]", subject);
          formData.append("data[body]", body);
          formData.append("customization[color]", color);
          formData.append("customization[bgColor]", bgColor);
          formData.append("customization[logo]", imageInt || "");
          formData.append("nom", leNom || "Sans nom");
          formData.append("date_creation", new Date().toISOString());
          formData.append("png_file", blob, `${leNom || "qr"}_${Date.now()}.png`);

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/qrcodes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          toast.success("QR Code email enregistré !");
          console.log(response.data);
        } catch (error) {
          if (error.response?.status === 422) {
            const apiErrors = error.response.data.errors;
            console.log("Erreurs Laravel :", apiErrors);
            toast.error("Erreur de validation : " + Object.values(apiErrors).join(", "));
          } else {
            toast.error("Erreur lors de l'enregistrement");
            console.error(error);
          }
        }
      }, "image/png");
    }, 500); // délai de 500ms après génération

    return () => clearTimeout(timeout);
  }, [mailtoLink]);

  return (
    <div className="flex flex-wrap justify-center gap-y-5 gap-x-20 doto pt-2 lg:pt-5">
      <form className="flex flex-col items-start">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Email</h1>
        <input
          type="text"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Sujet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />
        <input
          type="text"
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />

        <button
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          onClick={handleClick}
        >
          Générer QR Code
        </button>
      </form>

      <div className="bg-blue-50 rounded-2xl space-y-5 p-4 h-1/2">
      <div ref={qrSvgRef}>
  {isLoading && (
    <div className="flex items-center justify-center h-[250px]">
      <div className="loader-spinner"></div>
    </div>
  )}

  {qrReady && !isLoading && (
    <div className="p-4 border border-[#0000FF] rounded-lg">
                  <QRCodeSVG
                    marginSize={2}
                    value={generateMailtoLink()}
                    size={250}
                    level={"H"}
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
                </div>
              )}
            </div>


            <div ref={qrRef} className="hidden">
              {qrReady && (
                <QRCodeCanvas
                  marginSize={2}
                  value={generateMailtoLink()}
                  size={250}
                  level={"H"}
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