import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
function Tel() {
  const [tel, setTel] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState(35);
  const [tempLogoWidth, setTempLogoWidth] = useState(35);

  const [qrValue, setQrValue] = useState("");
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

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const handleClick = (e) => {
    e.preventDefault();

        if (!validatePhoneNumber(tel)) {
        setError("Numéro de téléphone invalide !");
        setQrValue("");
        return;
        }

    setError("");
    setQrValue(tel);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoHeight(tempLogoHeight);
    setLogoWidth(tempLogoWidth);
  };

  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10">
      <form className="flex flex-col items-start ">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Téléphone</h1>
        <input
          type="tel"
          value={tel}
          className="border-[#0000FF] border p-2 rounded-md w-80 mb-2"
          onChange={(e) => setTel(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}

        
      

        <button
          onClick={handleClick}
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
        >
          Générer QR Code
        </button>
      </form>
      <div className="bg-blue-50 rounded-2xl  justify-center p-4">
        {qrValue && (
        <QRCodeSVG
          value={qrValue}
          fgColor={color}
          bgColor={bgColor}
          size={170}
          imageSettings={
            imageInt
              ? {
                  src: imageInt,
                  height: logoHeight,
                  width: logoWidth,
                  excavate: true,
                }
              : undefined
          }
        />
      )}
      <UploadColors/>
      <Upload/>
      </div>
    </div>
  );
}

export default Tel;
