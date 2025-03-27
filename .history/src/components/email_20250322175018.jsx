import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Email = () => {
  
  

  const [email, setEmail] = useState("");
  const [tempSubject, setTempSubject] = 
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState(35);
  const [tempLogoWidth, setTempLogoWidth] = useState(35);

  const [qrValue, setQrValue] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [logoHeight, setLogoHeight] = useState(35);
  const [logoWidth, setLogoWidth] = useState(35);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageInt(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

    const generateMailtoLink = () => {
        if (!email) return "";
        return `mailto:${qrValue}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleClick = (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
          setError("Adresse Mail invalide !");
          setQrValue("");
          return;
        }
    

        setError("");
        setQrValue(email); // Met à jour la valeur du QR Code
        setColor(tempColor);
        setBgColor(tempBgColor);
        setImageInt(tempImageInt);
        setLogoHeight(tempLogoHeight);
        setLogoWidth(tempLogoWidth);
        
      };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Générateur de QR Code</h1>

      <form action="">
        <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md w-80 mb-4"
        />

          {error && <p className="text-red-500">{error}</p>}

        <input 
            type="text"
            placeholder="Subject" 
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            className="border p-2 rounded-md w-80 mb-4" 
        /> 
        <input 
            type="text"
            placeholder="Message" 
            className="border p-2 rounded-md w-80 mb-4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
        <label className="text-lg font-medium">Background Couleur :
          <input
            type="color"
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-md"
          />
          </label>

          <label className="text-lg font-medium">Couleur :
          <input
            type="color"
            value={tempBgColor}
            onChange={(e) => setTempBgColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-md"
          />
          </label>

        <div className="flex flex-col">

          <label className="text-lg font-medium">
            Image Upload :
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
          </label>

          <label className="text-lg font-medium">
            Image Height :
            <input
              type="number"
              className="border p-2 rounded-md w-80 mb-4"
              value={tempLogoHeight}
              onChange={(e) => setTempLogoHeight(Number(e.target.value))}
            />
          </label>

          <label className="text-lg font-medium">
            Image Width :
            <input
              type="number"
              className="border p-2 rounded-md w-80 mb-4"
              value={tempLogoWidth}
              onChange={(e) => setTempLogoWidth(Number(e.target.value))}
            />
          </label>

        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleClick}
        >
          Générer QR Code
        </button>
        
      </form>
      {/* Génération du QR Code */}

      { qrValue && <QRCodeCanvas 
        value={generateMailtoLink()} 
        size={170} 
        fgColor={color} 
        bgColor={bgColor}
          imageSettings={
            imageInt
              ? {
                  src: imageInt,
                  height: logoHeight,
                  width: logoWidth,
                  excavate: true,
                }
              : undefined
          } />}

    </div>
  );
};

export default Email;
