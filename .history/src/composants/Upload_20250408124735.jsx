import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
const UploadMenu = ({ onLogoChange }) => {
  const [showMenu, setShowMenu] = useState(false);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      onLogoChange(reader.result, setTempLogoTaille); // 🔹 Envoie la mise à jour au parent
    };
    reader.readAsDataURL(file);
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
        </div>
      )}
    </div>
  );
};

export default UploadMenu;
