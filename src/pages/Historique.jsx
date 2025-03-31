
import {useState} from "react";


function Historique(){
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return(
        <div className=" pt-5 xl:pt-14 justify-center">
            <h1 className="doto text-2xl xl:text-3xl semibold text-[#0000FF] text-center">Bienvenu(e) dans l'historique de vos codes QR</h1>
            <div className="flex items-center justify-center mt-7 xl:mt-16">
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
            <div className="mt-5 lg:mt-10 mb-2">
                <div className="mx-2 lg:mx-5 xl:mx-10 text-sm xl:text-xl doto text-[#0000FF] bg-blue-50 rounded border-2 border-[#0000FF] py-2 px-2 justify-between flex">
                    <h1>CodeQR</h1>
                    <h1>Nom</h1>
                    <h1>Contenu</h1>
                    <h1>Options</h1>
                </div>

            </div>
        </div>
    )
}
export default Historique