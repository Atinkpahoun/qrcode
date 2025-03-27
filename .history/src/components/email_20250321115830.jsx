import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Email = () => {
  
  

  const [email, setEmail] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempTaille, setTempTaille] = useState(200);
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState(35);
  const [tempLogoWidth, setTempLogoWidth] = useState(35);
  const [tempImgOpacity, setTempImgOpacity] = useState(1);
  
  const [qrValue, setQrValue] = useState("");
  const [subject, ]
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [taille, setTaille] = useState(200);
  const [imageInt, setImageInt] = useState("");
  const [logoHeight, setLogoHeight] = useState(35);
  const [logoWidth, setLogoWidth] = useState(35);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageInt(reader.result);
    };
    reader.readAsDataURL(file);
  };

    const generateMailtoLink = () => {
        if (!email) return "";
        return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleClick = (e) => {
        e.preventDefault()

        setError("");
        setQrValue(email); // Met à jour la valeur du QR Code
        setColor(tempColor);
        setBgColor(tempBgColor);
        setTaille(tempTaille);
        setImageInt(tempImageInt);
        setLogoHeight(tempLogoHeight);
        setLogoWidth(tempLogoWidth);
        setImgOpacity(tempImgOpacity);
        
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
        <input 
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />

<div className="flex flex-col">
          <label className="text-lg font-medium">
            QR Taille :
            <input
              type="number"
              className="border p-2 rounded-md w-80 mb-4"
              value={tempTaille}
              onChange={(e) => setTempTaille(Number(e.target.value))}
            />
          </label>

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

          <label className="text-lg font-medium">
            Image Opacity :
            <input
              type="number"
              step="0.1"
              className="border p-2 rounded-md w-80 mb-4"
              value={tempImgOpacity}
              onChange={(e) => setTempImgOpacity(Number(e.target.value))}
            />
          </label>
        </div>

        
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

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
        size={200} 
        fgColor={color} 
          imageSettings={
            imageInt
              ? {
                  src: imageInt,
                  height: logoHeight,
                  width: logoWidth,
                  opacity: imgOpacity,
                  excavate: true,
                }
              : undefined
          } />}

    </div>
  );
};

export default Email;
