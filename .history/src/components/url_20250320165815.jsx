import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    const [url, setUrl] = useState("")
    const [color, setColor] = useState("#000000")
    const [qrValue, setQrValue] = useState("")

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
                    fgColor={co                                                                                                                                              t'grrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlor}
                </div>
                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>

                {qrValue && <QRCodeSVG value={url} size={200} fgColor={color} />}
        </div>
    )
}

export default Url