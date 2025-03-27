import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    const [url, setUrl] = useState("")
    const [qrValue, setQrValue] = useState("")

    const handleClick = () => {
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
                <button 
                onClick={handleClick}
                >
                    clique moi 
                </button>
            </form>

                {qrValue && <QRCodeSVG value={url} size={128} />}
        </div>
    )
}

export default Url