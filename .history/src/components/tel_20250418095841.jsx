import React, { useRef, useState, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { toast } from "react-toastify";
import axios from "axios";

function Tel() {
  const [tel, setTel] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState(35);

  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("");
  const [error, setError] = useState("");

  const [showQr, setShowQr] = useState(false);
  const [loading, setLoading] = useState(false);

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const handleColorChange = (newColor, newBgColor) => {
    setTempColor(newColor);
    setTempBgColor(newBgColor);
  };

  const handleLogoChange = (newImage, newTaille) => {
    setTempImageInt(newImage);
    setTempLogoTaille(newTaille);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(tel)) {
      setError("Numéro de téléphone invalide !");
      setQrValue("");
      return;
    }

    setError("");
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
    setQrValue(tel);

    setShowQr(false);
    setLoading(true);

    setTimeout(() => {
      setShowQr(true);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (!qrValue || !qrRef.current || !showQr) return;

    const timeout = setTimeout(() => {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const token = localStorage.getItem("token");
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();
        const formData = new FormData();

        formData.append("user_id", userData.id);
        formData.append("type", "tel");
        formData.append("data[tel]", tel);
        formData.append("customization[color]", color);
        formData.append("customization[bgColor]", bgColor);
        formData.append("customization[imageInt]", imageInt);
        formData.append("nom", leNom || "Sans nom");
        formData.append("date_creation", new Date().toISOString());
        formData.append("png_file", blob, `${leNom || "qr"}_${Date.now()}.png`);

        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/qrcodes`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("QR Code tel enregistré :", response.data);
          toast.success("QR Code téléphone enregistré !");
        } catch (error) {
          toast.error("Erreur lors de l'enregistrement.");
          console.error(error);
        }
      }, "image/png");
    }, 300);

    return () => clearTimeout(timeout);
  }, [qrValue, showQr]);

  return (
    <div className="flex flex-wrap justify-center gap-y-5 gap-x-20 doto pt-2 lg:pt-5 doto">
      <form className="flex flex-col items-center md:items-start ">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Téléphone</h1>
        <PhoneInput
          defaultCountry="bj"
          value={tel}
          onChange={setTel}/>
        {error && <p className="text-red-500">{error}</p>}
     

>>>>>>> b9952b7ee406e65eee2b6d4518c20e4fbb3ae8ee
        <button
          onClick={handleClick}
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              QR en cours de génération...
            </>
          ) : (
            "Générer QR Code"
          )}
        </button>
      </form>

      <div className="bg-blue-50 rounded-2xl space-y-5 p-4">
        <div ref={qrSvgRef}>
          {qrValue && (
            <div className="p-4 border border-[#0000FF] rounded-lg">
              <QRCodeSVG
                marginSize={2}
                value={qrValue}
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
        </div>
        <div ref={qrRef} className=" hidden">
          {qrValue && (
            <div>
              <QRCodeCanvas
                marginSize={2}
                value={qrValue}
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
        </div>

        {qrValue && showQr && (
          <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
        )}

        <UploadColors onColorChange={handleColorChange} />
        <Upload onLogoChange={handleLogoChange} />

        <input
          type="text"
          name="nomcode"
          placeholder="Donnez un nom au code"
          className="border p-2 w-54 border-[#0000FF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
          onChange={(e) => setLeNom(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Tel;