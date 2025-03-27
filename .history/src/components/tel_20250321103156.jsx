import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Tel () {

    const [tel, setTel] = useState("")
    const [color, setColor] = useState("#ffffff")
    const [bgColor, setBgColor] = useState("#000000")
    const [taille, setTaille] = useState(200)
    const [imageInt, setImageInt] = useState("")
    const [qrValue, setQrValue] = useState("")
    const [logoHeight, setLogoHeight] = useState(35)
    const [logoWidth, setLogoWidth] = useState(35)
    const [imgOpacity, setImgOpacity] = useState(1)
    const [error, setError] = us


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
          setQrValue(tel);
      };
      
    return(
        <div>
            <form action="">
                <input 
                    type="tel"
                    value={ tel}
                    className="border p-2 rounded-md w-80 mb-4"
                    onChange={(e) => setTel(e.target.value)}
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

                    <label htmlFor="" className="text-lg font-medium">Image Opacity :  
                    <input type="number" step="0.1" id="" className="border p-2 rounded-md w-80 mb-4" onChange={(e) => setImgOpacity(e.target.value)} />
                    </label>               
                    
                </div>

                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>
                    
                {qrValue && <QRCodeSVG value={tel} fgColor={color} bgColor={bgColor} size={taille} imageSettings={
                    imageInt
                    ? {
                        src: imageInt, // Image intégrée en base64
                        height: logoHeight, // Taille de l’image dans le QR Code
                        width: logoWidth,
                        opacity: imgOpacity,
                        excavate: true, // Garde un espace clair derrière l'image
                      }
                    : undefined
                     } />}
        </div>
    )
}

export default Tel