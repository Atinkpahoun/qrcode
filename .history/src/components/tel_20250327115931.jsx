import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import { FaChevronDown } from "react-icons/fa";

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

  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
    
      const qrRef = useRef(null); // Référence pour le QR Code PNG
    
      const toggleColorMenu = () => {
        setShowColorMenu((prev) => !prev);
      };
    
      const toggleLogoMenu = () => {
        setShowLogoMenu((prev) => !prev);
      };
  

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

     // Fonction pour télécharger en PNG
     const downloadPNG = () => {
      const canvas = qrRef.current?.querySelector("canvas");
      cons
      if (!canvas) return;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "QRCode.png";
      link.click();
    };
  
    const downloadSVG = () => {
      // Récupérer l'élément SVG contenant le QR code
      const svg = qrRef.current?.querySelector("svg");
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
      <div ref={qrRef} className="bg-blue-50 rounded-2xl  justify-center p-4">
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
                  <div className="p-4">
                            <button
                              onClick={toggleColorMenu}
                              className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
                            >
                              Couleurs
                              <FaChevronDown />
                            </button>
                
                            {showColorMenu && (
                              <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
                                <div className="mb-4">
                                  <label className="text-lg font-medium">
                                    Couleur
                                    <input
                                      type="color"
                                      value={color}
                                      onChange={(e) => {
                                        setTempColor(e.target.value);
                                      }}
                                      className="w-10 h-10 p-1 border rounded-md ml-2"
                                    />
                                  </label>
                                </div>
                                <div className="mb-4">
                                  <label className="text-lg font-medium">
                                    Couleur de Fond
                                    <input
                                      type="color"
                                      value={bgColor}
                                      onChange={(e) => {
                                        setTempBgColor(e.target.value);
                                      }}
                                      className="w-10 h-10 p-1 border rounded-md ml-2"
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                
                          <div className="p-4">
                            <button
                              onClick={toggleLogoMenu}
                              className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
                            >
                              Logo
                              <FaChevronDown />
                            </button>
                
                            {showLogoMenu && (
                              <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="mb-4"
                                />
                                <label className="block text-lg font-medium mb-2">
                                  Hauteur
                                  <input
                                    type="number"
                                    className="border p-2 rounded-md w-72 mb-4"
                                    value={tempLogoHeight}
                                    onChange={(e) => setTempLogoHeight(e.target.value)}
                                    placeholder="Entrez la hauteur"
                                  />
                                </label>
                                <label className="block text-lg font-medium mb-2">
                                  Largeur
                                  <input
                                    type="number"
                                    className="border p-2 rounded-md w-72 mb-4"
                                    value={tempLogoWidth}
                                    onChange={(e) => setTempLogoWidth(e.target.value)}
                                    placeholder="Entrez la largeur"
                                  />
                                </label>
                              </div>
                            )}
                          </div>
      
      </div>
    </div>
  );
}

export default Tel;
