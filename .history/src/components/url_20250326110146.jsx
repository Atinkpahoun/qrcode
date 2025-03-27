import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'
import Upload from "../composants/Upload.jsx";
import UploadColors from "../composants/UploadColors.jsx";
import { FaChevronDown } from 'react-icons/fa';
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
    const [tempLogoHeight, setTempLogoHeight] = useState('');
    const [tempLogoWidth, setTempLogoWidth] = useState('');
    

    const [showColorMenu, setShowColorMenu] = useState(false);  // Pour le menu des couleurs
    const [showLogoMenu, setShowLogoMenu] = useState(false);    // Pour le menu des logos

      
    const toggleColorMenu = () => {
      setShowColorMenu((prev) => !prev);  // Bascule l'affichage du menu des couleurs
    };
    
    const toggleLogoMenu = () => {
      setShowLogoMenu((prev) => !prev);  // Bascule l'affichage du menu des logos
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

                  <div className="flex space-x-4">
                      <button onClick={downloadSVG} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Télécharger SVG
                          </button>
                          <button onClick={downloadPNG} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                            Télécharger PNG
                          </button>
                        </div>
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
                              onChange={(e) => {setTempColor(e.target.value)
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
                              onChange={(e) => {setTempBgColor(e.target.value);
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
                          className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center "
                        >
                          Logo
                          <FaChevronDown/>
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
      </section>  
    )
}

export default Url