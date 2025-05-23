import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const UploadColors = ({ onColorChange }) => {
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showMenu, setShowMenu] = useState(false); 
  

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Fonction pour changer la couleur principale
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor, bgColor); // Met à jour uniquement la couleur principale
  };

  // Fonction pour changer la couleur de fond
  const handleBgColorChange = (e) => {
    const newBgColor = e.target.value;
    setBgColor(newBgColor);
    onColorChange(color, newBgColor);
  };

  return (
    <div >
      <button
        onClick={toggleMenu}
        className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center"
      >
        Couleurs
        <FaChevronDown />
      </button>
      
      {showMenu && (
        <div className="mt-4 p-2 border border-[#0000FF] rounded-lg bg-white shadow-md w-44">
          
          <div className="mb-4">
            <label className="text-lg font-medium">
              Couleur 
              <input
                type="color"
                value={color}
                onChange={
                  handleColorChange
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
                onChange={
                  handleBgColorChange
                }  
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
