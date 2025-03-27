import { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"; // Ajout de QRCodeCanvas
import { FaChevronDown } from 'react-icons/fa';
import { FaDownload } from "react-icons/fa"; // Icône de téléchargement

function Url() {
  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [imageInt, setImageInt] = useState("");
  const [logoHeight, setLogoHeight] = useState(35);
  const [logoWidth, setLogoWidth] = useState(35);
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const [tempColor, setTempColor] = useState("#000000");
  const [tempBgColor, setTempBgColor] = useState("#ffffff");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState(35);
  const [tempLogoWidth, setTempLogoWidth] = useState(35);

  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);

  const qrRef = useRef(null); // Référence pour le QR Code SVG
  const canvasRef = useRef(null); // Référence pour le QR Code en PNG

  const toggleColorMenu = () => setShowColorMenu((prev) => !prev);
  const toggleLogoMenu = () => setShowLogoMenu((prev) => !prev);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImageInt(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError("Veuillez entrer une URL valide.");
      return;
    }
    setError("");
    setQrValue(url);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoHeight(tempLogoHeight);
    setLogoWidth(tempLogoWidth);
  };

  // 📌 Fonction pour télécharger en SVG
  const downloadSVG = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "QRCode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 📌 Fonction pour télécharger en PNG
  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
        <form className="flex flex-col items-start" action="">
          <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Lien/URL</h1>
          <input
            type="url"
            value={url}
            className={`border-[#0000FF] border p-2 rounded-md w-80 mb-2 ${error && "border-red-500"}`}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Entrez une URL"
          />
          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleClick}
            className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4"
          >
            Générer QR Code
          </button>
        </form>

        <div className="bg-blue-50 rounded-2xl justify-center p-4">
          {qrValue && (
            <div ref={qrRef}>
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

          {/* QR Code en PNG (invisible) */}
          <canvas ref={canvasRef} style={{ display: "none" }}>
            <QRCodeCanvas value={qrValue} fgColor={color} bgColor={bgColor} size={170} />
          </canvas>

          {/* Boutons de téléchargement */}
          {qrValue && (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={downloadSVG}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2"
              >
                <FaDownload /> Télécharger SVG
              </button>
              <button
                onClick={downloadPNG}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-x-2"
              >
                <FaDownload /> Télécharger PNG
              </button>
            </div>
          )}

          {/* Menu des couleurs */}
          <div className="p-4">
            <button
              onClick={toggleColorMenu}
              className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
            >
              Couleurs <FaChevronDown />
            </button>

            {showColorMenu && (
              <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
                <div className="mb-4">
                  <label className="text-lg font-medium">
                    Couleur
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setTempColor(e.target.value)}
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
                      onChange={(e) => setTempBgColor(e.target.value)}
                      className="w-10 h-10 p-1 border rounded-md ml-2"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Url;
