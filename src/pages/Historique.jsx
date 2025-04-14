
import React, {useState} from "react";


function Historique(){
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return(
        <div className=" pt-5 xl:pt-12 justify-center doto">
            <h1 className=" text-2xl xl:text-3xl font-bold text-[#0000FF] text-center">Bienvenu(e) dans l'historique de vos codes QR</h1>
            <div className="flex items-center justify-center my-6 xl:my-12">
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
            <div className="flex flex-wrap justify-center gap-5 lg:gap-10">
                <div className="flex rounded border-2 border-[#0000FF] p-2 md:p-4  max-w-[500px] shadow">
                    <div className="justify-center flex flex-col pr-2 md:pr-4 border-r-2 border-[#0000FF]">
                        <img className="h-24" src="/src/assets/degrader1.gif" alt="" />
                        <div className="justify-center flex flex-col mt-4 space-y-2">
                            <button className="border-2 border-[#0000FF] rounded px-6 bg-blue-50 py-1">Scans</button>
                            <button className="rounded px-6 py-1 bg-[#0000FF] text-white ">Télécharger</button>
                        </div>
                    </div>
                    <div className="pl-2 md:pl-4 justify-between space-y-6 ">
                        <div className="space-y-3">
                            <h1 className="text-[#0000FF] font-medium text-lg">Origine du code QR</h1>
                            <h1>Nom du code QR</h1>
                            <h1>Date de création</h1>
                            <h1>Date de modification</h1>
                        </div>
                        <button className="rounded px-6 py-1 bg-[#0000FF] text-white ">Modifier</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Historique