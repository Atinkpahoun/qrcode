import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
function Url () {
    
    const [qrValue, setQrValue] = useState("");
    const [color, setColor] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [imageInt, setImageInt] = useState("");
    const [logoHeight, setLogoHeight] = useState(35);
    const [logoWidth, setLogoWidth] = useState(35);
    const [error, setError] = useState("");

    const [url, setUrl] = useState("");
    const [tempColor, setTempColor] = useState("#ffffff");
    const [tempBgColor, setTempBgColor] = useState("#000000");
    const [tempImageInt, setTempImageInt] = useState("");
   

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
        e.preventDefault()

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

      const handleColorChange = (newColor, newBgColor) => {
        setColor(newColor);
        setTempBgColor(newBgColor);
      };
      
     
    return(
      <section> 
         
        <div className="flex flex-wrap gap-y-5 gap-x-10 doto">
          
            <form className="flex flex-col items-start " action="">
              <h1 className="text-3xl font-bold text-[#0000FF] mb-8">Lien/URL</h1>
              <input 
                type="url"
                value={ url}
                className={` border-[#0000FF] border p-2 rounded-md w-80 mb-2 ${error && "border-red-500"}`}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Entrez une URL"
              />
                
                {error && <p className="text-red-500">{error}</p>}

                <button
                    onClick={handleClick}
                    className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg mt-4">
                    Générer QR Code
                </button>
            </form>

            <div className="bg-blue-50 rounded-2xl  justify-center  p-4">
                 
                {qrValue && <QRCodeSVG value={qrValue} fgColor={color} bgColor={bgColor} size={170} imageSettings={
                    imageInt
                    ? {
                        src: imageInt, // Image intégrée en base64
                        height: logoHeight, // Taille de l’image dans le QR Code
                        width: logoWidth,
                        excavate: true, // Garde un espace clair derrière l'image
                      }
                    : undefined
                     } />}
               
                  <UploadColors onColorChange={handleColorChange} />
                  <Upload/>  
            </div>
        </div>
      </section>  
    )
}

export default Url