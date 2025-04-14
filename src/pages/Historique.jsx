
import React, {useState} from "react";


function Historique(){
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return(
        <div className=" pt-5 xl:pt-14 justify-center doto">
            <h1 className=" text-2xl xl:text-3xl font-bold text-[#0000FF] text-center">Bienvenu(e) dans l'historique de vos codes QR</h1>
            <div className="flex items-center justify-center mt-7 xl:mt-16 mb-5 xl:mb-10">
            <select 
                value={selectedOption} 
                onChange={handleChange} 
                className="bg-blue-50 border-2 border-[#0000FF] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            >
                <option value="tous">Tous les codes QR</option>
                <option value="URL">URL</option>
                <option value="email">Email</option>
                <option value="texte">Texte</option>
                <option value="téléphone">Téléphone</option>
                <option value="image">Image</option>
            </select>

            </div>
            <div className="flex flex-wrap justify-center">
                <div className="flex rounded border-2 border-[#0000FF] p-4 max-w-96">
                    <div className="justify-center flex flex-col pr-4 border-r-2 border-[#0000FF]">
                        <img className="h-20" src="/src/assets/degrader1.gif" alt="" />
                        <div className="justify-center flex flex-col mt-4 space-y-2">
                            <button className="border-2 border-[#0000FF] rounded px-6 bg-blue-50 py-1">Scans</button>
                            <button className="rounded px-6 py-1 bg-[#0000FF] text-white ">Télécharger</button>
                        </div>
                    </div>
                    <div className="pl-4">
                        
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Historique