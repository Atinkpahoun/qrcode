import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    <QRCodeSVG
        value={"https://.tumblr.com/"}
        title={"Title for my QR Code"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        imageSettings={{
            src: "https://static.zpao.com/favicon.png",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            opacity: 1,
            excavate: true,
        }}
     />

    const [url, setUrl] = useState("")
    return(
        <div>
            <form action="">
                <input 
                    type="url"
                    value={ url}
                    className="border p-2 rounded-md w-80 mb-4"
                    onChange={(e) => setUrl(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Url