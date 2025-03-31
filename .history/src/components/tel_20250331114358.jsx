import { useRef, useState,} from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import { FaChevronDown } from "react-icons/fa";

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
  const [error, setError] = useState("");
    
  const qrRef = useRef(null); // Référence pour le QR Code PNG
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
    setLogoTaille(tempLogoT);

  };

     // Fonction pour télécharger en PNG
     const downloadPNG = () => {
      const canvas = qrRef.current?.querySelector("canvas");
      if (!canvas) return;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "QRCode.png";
      link.click();
    };
  
    const downloadSVG = () => {
      // Récupérer l'élément SVG contenant le QR code
      const svg = qrSvgRef.current?.querySelector("svg");
      if (!svg) {
        console.error("QR code SVG not found!");
        return;
      }
    
      // Convertir l'élément SVG en chaîne de texte
      const svgData = new XMLSerializer().serializeToString(svg);
    
      // Ajouter un en-tête pour éviter que les SVG ne soient rendus comme du texte brut
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    
      // Créer une URL pour le téléchargement
      const svgUrl = URL.createObjectURL(svgBlob);
    
      // Créer un lien pour le téléchargement
      const link = document.createElement("a");
      link.href = svgUrl;
      link.download = "QRCode.svg"; // Nom du fichier SVG à télécharger
      link.click();
    
      // Libérer l'URL object pour éviter les fuites de mémoire
      URL.revokeObjectURL(svgUrl);
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
      {qrValue && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={downloadPNG}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Télécharger PNG
                    </button>
                    <button
                      onClick={downloadSVG}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                      >
                      Télécharger SVG
                    </button>
                  </div>
                )}
                <UploadColors onColorChange={handleColorChange} />
                <Upload onLogoChange={handleLogoChange} />
      
      </div>
    </div>
  );
}

export default Tel;
