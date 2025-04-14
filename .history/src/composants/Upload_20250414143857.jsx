import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
const UploadMenu = ({ onLogoChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [preview, setPreview] = useState(null);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onLogoChange(reader.result, 50);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onLogoChange("", 0);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
 
  return (
    <div >
      <button
        onClick={toggleMenu}
        className="bg-[#0000FF] text-white font-semibold py-2 px-4 rounded-lg flex gap-x-2 items-center "
      >
        Logo
        <FaChevronDown/>
      </button>
      
      {showMenu && (
        <div className="mt-4 p-4 w-48 border border-[#0000FF] rounded-lg bg-white shadow-md">
          <div className="flex flex-col mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            <div >
            {preview && (
            <div className="flex flex-col items-center">
              <img src={preview} alt="Logo preview" className="w-12 h-12 object-contain mb-2" />
              <button
                onClick={handleRemoveImage}
                className="text-sm text-red-600 underline hover:text-red-800"
              >
                Supprimer le logo
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMenu;
