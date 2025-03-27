import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Importer l'icône "plus"

const SeeMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Voir plus
      <FaPlus className="ml-2" /> {/* Icône à droite du texte */}
    </button>
  );
};

export default SeeMoreButton;
