import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    const [url, setUrl] = useState("")
    const [color, setColor] = useState("#000000")
    const [bgColor, setBgColor] = useState("#000000")
    const [taille, setTaille] = useState(200)
    const [qrValue, setQrValue] = useState("")

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
        setQrValue(url); // Met à jour la valeur du QR Code
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

                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>

                {qrValue && <QRCodeSVG value={url} size={200} fgColor={color} bgColor={bgColor} size={taille} />}
        </div>
    )
}

export default Url