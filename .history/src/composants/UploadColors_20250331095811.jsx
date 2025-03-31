import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const UploadColors = ({ onColorChange }) => {
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showMenu, setShowMenu] = useState(false); 
  

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleColorChange = (newColor, newBgColor) => {
    setColor(newColor);
    setBgColor(newBgColor);
    onColorChange(newColor, newBgColor); // 🔹 Envoie la mise à jour au parent
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleMenu}
        className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
      >
        Couleurs
        <FaChevronDown />
      </button>
      
      {showMenu && (
        <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
          
          <div className="mb-4">
            <label className="text-lg font-medium">
              Couleur 
              <input
                type="color"
                value={color}
                onChange={(e) => 
                  handleColorChange(e.target.value);
                }
                className="w-10 h-10 p-1 border rounded-md ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium">
              Couleur de Fond
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {setBgColor(e.target.value);
                  handleColorChange();
                }}  
                className="w-10 h-10 p-1 border rounded-md ml-2"
              />
            </label>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default UploadColors;
