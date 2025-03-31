import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
const UploadMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [tempLogoHeight, setTempLogoHeight] = useState('');
  const [tempLogoWidth, setTempLogoWidth] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Gérer le téléchargement de l'image ici
      console.log('Image téléchargée:', file.name);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
 
  return (
    <div className="p-4 w-1/2">
      <button
        onClick={toggleMenu}
        className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center "
      >
        Logo
        <FaChevronDown/>
      </button>
      
      {showMenu && (
        <div className="mt-4 p-4 w-48 border border-[#0000FF] rounded-lg bg-white shadow-md  ">
          <div className="flex flex-col mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            <div >
              {handleImageUpload} 
            </div>
          </div>
          <label className="block   mb-2">
            Hauteur
            <input
              type="number"
              className="border p-2 rounded-md w-40 text-sm mb-4"
              value={tempLogoHeight}
              onChange={(e) => setTempLogoHeight(e.target.value)}
              placeholder="Entrez la hauteur"
            />
          </label>
          <label className="block  mb-2">
            Largeur
            <input
              type="number"
              className="border p-2 text-sm rounded-md w-40 mb-4"
              value={tempLogoWidth}
              onChange={(e) => setTempLogoWidth(e.target.value)}
              placeholder="Entrez la largeur"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadMenu;
