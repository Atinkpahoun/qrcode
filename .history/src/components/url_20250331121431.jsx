import { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import { FaChevronDown } from "react-icons/fa";
import DownloadQR from "../composants/DownloadQR.jsx";

function Url() {
  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [imageInt, setImageInt] = useState("");
  const [logoTaille, setLogoTaille] = useState(35);
  const [leNom, setLeNom] = useState("")
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState("");

  const qrRef = useRef(null);
  const qrSvgRef = useRef(null)

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
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

    if (!isValidUrl(url)) {
      setError("Veuillez entrer une URL valide.");
      return;
    }

    setError("");
    setQrValue(url);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setImageInt(tempImageInt);
    setLogoTaille(tempLogoTaille);
  };
  
  return (
    <section>
      <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
        <form className="flex flex-col items-center md:items-start " action="">
          <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Lien/URL</h1>
          <input
            type="url"
            value={url}
            className={`border-[#0000FF] border p-2 rounded-md w-72 lg:w-80 mb-2 ml-4 md:ml-0 ${
              error && "border-red-500"
            }`}
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

        <div className="bg-blue-50 rounded-2xl justify-center p-4 ">
          {qrValue && (
            <div ref={qrRef}>
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

          {qrValue && (
            <div className="mt-4 flex flex-col gap-4">
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
          <div ref={qrRef} className="hidden">
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
    </section>
  );
}

export default Url;
