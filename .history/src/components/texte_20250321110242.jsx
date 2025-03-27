import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function Texte() {
  const [texte, setTexte] = useState("");
  const [tempColor, setTempColor] = useState("#ffffff");
  const [tempBgColor, setTempBgColor] = useState("#000000");
  const [tempTaille, setTempTaille] = useState(200);
  const [tempImageInt, setTempImageInt] = useState("");
  const [tempLogoHeight, setTempLogoHeight] = useState(35);
  const [tempLogoWidth, setTempLogoWidth] = useState(35);
  const [tempImgOpacity, setTempImgOpacity] = useState(1);

  const [qrValue, setQrValue] = useState("");
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
      setTempImageInt(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (e) => {
    e.preventDefault();


    setError("");
    setQrValue(texte);
    setColor(tempColor);
    setBgColor(tempBgColor);
    setTaille(tempTaille);
    setImageInt(tempImageInt);
    setLogoHeight(tempLogoHeight);
    setLogoWidth(tempLogoWidth);
    setImgOpacity(tempImgOpacity);
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
        {! && <p className="text-red-500">{error}</p>}

        <div className="flex items-center gap-4 mb-4">
          <label className="text-lg font-medium">Couleur :</label>
          <input
            type="color"
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-md"
          />
          <label className="text-lg font-medium">Background Color</label>
          <input
            type="color"
            value={tempBgColor}
            onChange={(e) => setTempBgColor(e.target.value)}
            className="w-10 h-10 p-1 border rounded-md"
          />
        </div>

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

        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Générer QR Code
        </button>
      </form>

      {qrValue && (
        <QRCodeSVG
          value={qrValue}
          fgColor={color}
          bgColor={bgColor}
          size={taille}
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
          }
        />
      )}
    </div>
  );
}

export default Texte;
