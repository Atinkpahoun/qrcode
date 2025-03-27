import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function QRCodeGeneratorImg() {
  const [qrValue, setQrValue] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const storageRef = ref(storage, `uploads/${file.name}`);
    
    try {
      await uploadBytes(storageRef, file);
      console.log("Upload réussi, récupération de l'URL...");
  
      const url = await getDownloadURL(storageRef);
      console.log("URL récupérée :", url);
  
      setQrValue(url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          Background:
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </label>
      </div>
      {loading ? <p>Upload en cours...</p> : qrValue && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <QRCodeSVG value={qrValue} fgColor={color} bgColor={bgColor} size={170} />
        </div>
      )}
    </div>
  );
}
