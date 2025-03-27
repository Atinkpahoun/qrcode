import { useState } from "react"

function Url () {

    const [url, setUrl] = useState("")
    return(
        <div>
            <form action="">
                <input type="url" />
            </form>
        </div>
    )
}

export default Url