import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'
import Text from '../assets/react.svg'

function Url () {

    const [url, setUrl] = useState("")
    const [color, setColor] = useState("#ffffff")
    const [bgColor, setBgColor] = useState("#000000")
    const [taille, setTaille] = useState(200)
    const [imageInt, setImageInt] = useState("")
    const [qrValue, setQrValue] = useState("")
    const [logoHeight, setLogoHeight] = useState(24)
    const [logoWidth, setLogoWidth] = useState(24)
    const [imgOpacity, setImgOpacity] = useState(1)


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
      };
      
    return(
        <div>
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
                    onChange={(e) => setColor(e.target.value)}
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
                    <label htmlFor="" className="text-lg font-medium">QR Taille : 
                    <input type="number" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setTaille(e.target.value)} />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Width :  
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Heigth :  
                    <input type="number" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setLogoHeight(e.target.value)} />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Width :  
                    <input type="number" id="" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setLogoWidth(e.target.value)} />
                    </label>

                    <label htmlFor="" className="text-lg font-medium">Image Width :  
                    <input type="number" id="" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setLogoWidth(e.target.value)} />
                    </label>
                </div>

                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>
                    
                {qrValue && <QRCodeSVG value={url} fgColor={color} bgColor={bgColor} size={taille} imageSettings={
                    imageInt
                    ? {
                        src: imageInt, // Image intégrée en base64
                        height: logoHeight, // Taille de l’image dans le QR Code
                        width: logoWidth,
                        opacity: 1,
                        excavate: true, // Garde un espace clair derrière l'image
                      }
                    : undefined
                     } />}
        </div>
    )
}

export default Url