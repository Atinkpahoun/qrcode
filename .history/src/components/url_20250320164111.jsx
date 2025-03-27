import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    const [url, setUrl] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
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
                <button >
                    clique moi 
                </button>
            </form>

                {<QRCodeSVG value={url} size={128} />}
        </div>
    )
}

export default Url