import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
const UploadMenu = ({ onLogoChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [image, setImage] = useState("");
  const [tempLogoTaille, setTempLogoTaille] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      onLogoChange(reader.result, setTempLogoTaille, setTempLogoWidth); // 🔹 Envoie la mise à jour au parent
    };
    reader.readAsDataURL(file);
  };

  const handleSizeChange = (height, width) => {
    setTempLogoHeight(height);
    setTempLogoWidth(width);
    onLogoChange(image, height, width); // 🔹 Met à jour le parent
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
 
  return (
    <div className="p-4">
      <button
        onClick={toggleMenu}
        className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center "
      >
        Logo
        <FaChevronDown/>
      </button>
      
      {showMenu && (
        <div className="mt-4 p-4 border border-[#0000FF] rounded-lg bg-white shadow-md">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <label className="block text-lg font-medium mb-2">
            Hauteur
            <input
              type="number"
              className="border p-2 rounded-md w-72 mb-4"
              value={tempLogoHeight}
              onChange={(e) => handleSizeChange(Number(e.target.value), setTempLogoHeight)}
              placeholder="Entrez la hauteur"
            />
          </label>
          <label className="block text-lg font-medium mb-2">
            Largeur
            <input
              type="number"
              className="border p-2 rounded-md w-72 mb-4"
              value={tempLogoWidth}
              onChange={(e) => handleSizeChange(setTempLogoWidth, Number(e.target.value))}
              placeholder="Entrez la largeur"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadMenu;
