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
    const [height, setHeight] = useState

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageInt(reader.result);
        };
        reader.readAsDataURL(file);
      };

      const handleClick = () => {
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
                <input type="number" onChange={(e) => setTaille(e.target.value)} />

                <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>
                    {isLoading && <Text />}
                {qrValue && <QRCodeSVG value={url} fgColor={color} bgColor={bgColor} size={taille} imageSettings={
                    imageInt
                    ? {
                        src: imageInt, // Image intégrée en base64
                        height: 50, // Taille de l’image dans le QR Code
                        width: 50,
                        excavate: true, // Garde un espace clair derrière l'image
                      }
                    : undefined
                     } />}
        </div>
    )
}

export default Url