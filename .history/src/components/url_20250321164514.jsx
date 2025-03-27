import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {
    
    const [qrValue, setQrValue] = useState("");
    const [color, setColor] = useState("#ffffff")
    const [bgColor, setBgColor] = useState("#000000")
    const [imageInt, setImageInt] = useState("")
    const [qrValue, setQrValue] = useState("")
    const [logoHeight, setLogoHeight] = useState(35)
    const [logoWidth, setLogoWidth] = useState(35)

    const [url, setUrl] = useState("")
    const [tempColor, setTempColor] = useState("#ffffff");
    const [tempBgColor, setTempBgColor] = useState("#000000");
    const [tempTaille, setTempTaille] = useState(200);
    const [tempImageInt, setTempImageInt] = useState("");
    const [tempLogoHeight, setTempLogoHeight] = useState(35);
    const [tempLogoWidth, setTempLogoWidth] = useState(35);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageInt(reader.result);
        };
        reader.readAsDataURL(file);
      };

      const handleClick = (e) => {
        e.preventDefault()
          
        setQrValue(url);
        setColor(tempColor);
        setBgColor(tempBgColor);
        setTaille(tempTaille);
        setImageInt(tempImageInt);
        setLogoHeight(tempLogoHeight);
        setLogoWidth(tempLogoWidth);
      };
      
    return(
        <div className="flex flex-wrap gap-y-5 gap-x-10">
            <form action="">
                <input 
                    type="url"
                    value={ url}
                    className="border p-2 rounded-md w-80 mb-4"
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex items-center gap-4 mb-4">
                    <label className="text-lg font-medium">Couleur :</label>
                    <input
                    type="color"
                    value={color}
                    onChange={(e) => tempColor(e.target.value)}
                    className="w-10 h-10 p-1 border rounded-md"
                    />
                    <label htmlFor="" className="text-lg font-medium">Background Color</label>
                    <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 p-1 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    

                    <label htmlFor="" className="text-lg font-medium">Image Width :  
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Heigth :  
                    <input type="number" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setLogoHeight(e.target.value)} />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Width :  
                    <input type="number" id="" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setLogoWidth(e.target.value)} />
                    </label>
              
                    
                </div>

                <button 
                onClick={handleClick}
                >
                    Générer 
                </button>
            </form>

            <div className="bg-blue-50 rounded-xl p-8">
                    
                {qrValue && <QRCodeSVG value={url} fgColor={color} bgColor={bgColor} size={170} imageSettings={
                    imageInt
                    ? {
                        src: imageInt, // Image intégrée en base64
                        height: logoHeight, // Taille de l’image dans le QR Code
                        width: logoWidth,
                        excavate: true, // Garde un espace clair derrière l'image
                      }
                    : undefined
                     } />}
            </div>
        </div>
    )
}

export default Url