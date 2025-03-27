import { useState } from "react"
import {QRCodeSVG} from 'qrcode.react'

function Url () {

    const [url, setUrl] = useState
    return(
        <div>
            <form action="">
                <input 
                    type="url"

                />
            </form>
        </div>
    )
}

export default Url