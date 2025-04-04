import { useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import UploadColors from "../composants/UploadColors";
import UploadMenu from "../composants/Upload";

function Texte() {
  const [texte, setTexte] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);

  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [imageInt, setImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

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

    
    setQrValue(texte);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoHeight(tempLogoHeight);
    setLogoWidth(tempLogoWidth);
  };

  return (
    <div>
      <form>
        
        <input
          type="text"
          value={texte}
          className="border p-2 rounded-md w-80 mb-4"
          onChange={(e) => setTexte(e.target.value)}
        />

        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Générer QR Code
        </button>
      </form>
    
      <div>
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
                      height: logoHeight,
                      width: logoWidth,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </div>
        )}
      </div>
      <div className="hidden">
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
                      height: logoHeight,
                      width: logoWidth,
                      excavate: true,
                    }
                  : undefined
              }
            />
          </div>
        )}
      </div>

      <UploadColors onColorChange={handleColorChange} />
      <UploadMenu onLogoChange={handleLogoChange} />

      </div>
    
  );
}

export default Texte;
