import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
const Email = () => {
  
  

  const [email, setEmail] = useState("");
  const [tempSubject, setTempSubject] = useState("")
  const [tempBody, setTempBody] = useState("")
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
        return `mailto:${qrValue}?subject=${encodeURIComponent(tempSubject)}&body=${encodeURIComponent(tempBody)}`;
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
        setTempSubject(subject)
        setTempBody(body)
        setColor(tempColor);
        setBgColor(tempBgColor);
        setImageInt(tempImageInt);
        setLogoHeight(tempLogoHeight);
        setLogoWidth(tempLogoWidth);
        
      };

  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10">

      <form className="flex flex-col items-start " action="">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Email</h1>
        <input
            type="text"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#0000FF] p-2 rounded-md w-80 mb-4"
        />

          {error && <p className="text-red-500">{error}</p>}

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
      <div className="bg-blue-50 rounded-2xl  justify-center p-4 "> 
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
          <UploadColors/>
          <Upload/>
      </div> 
    </div>
  );
};

export default Email;
