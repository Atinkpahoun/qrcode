import { useState } from "react"

function Url () {

    const [url, setUrl] = useState("")
    return(
        <div>
            <h1></h1>
            <form action="">
                <input 
                    type="url"
                    placeholder="Entrez une URL"
                    value={email}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded-md w-80 mb-4
                 />
            </form>
        </div>
    )
}

export default Url