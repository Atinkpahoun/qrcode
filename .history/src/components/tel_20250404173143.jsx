import { useRef, useState,} from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import DownloadQR from "../composants/DownloadQR.jsx";
import { FaChevronDown } from "react-icons/fa";
import PhoneInput from "react-phone-number-input/input";
import 'react-phone-number-input/style.css'


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
  const [leNom, setLeNom] = useState("")
  const [error, setError] = useState("");
    
  const qrRef = useRef(null);
  const qrSvgRef = useRef(null)

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
    setQrValue(tel);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);

  };

  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10">
      <form className="flex flex-col items-start ">
        <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Téléphone</h1>
    <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="BJ"
          value={tel}
          onChange={setTel}/>
        {error && <p className="text-red-500">{error}</p>}

        
      

        <button
          onClick={handleClick}
          className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
        >
          Générer QR Code
        </button>
      </form>
      <div className="bg-blue-50 rounded-2xl  justify-center p-4">
        <div ref={qrSvgRef}>
          {qrValue && (
            <div>
              <QRCodeSVG
                value={qrValue}
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
        </div>
        <div ref={qrRef} className=" hidden">
          {qrValue && (
            <div>
              <QRCodeCanvas
                value={qrValue}
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
        </div>
      {qrValue && (
        <DownloadQR qrRef={qrRef} qrSvgRef={qrSvgRef} leNom={leNom} />
                )}
                <UploadColors onColorChange={handleColorChange} />
                <Upload onLogoChange={handleLogoChange} />
                
                <div>
                  <input type="text" name="nomcode" className="border p-2 rounded-md w-72 mb-4" onChange={(e) => setLeNom(e.target.value)} />
                </div>
      </div>
    </div>
  );
}

export default Tel;
