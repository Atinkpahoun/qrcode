import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Retour() {
  return (
    <div className='ml-2 md:ml-5'>
        <Link to="/Accueil"><FaArrowLeft size={28} color='blue' /></Link> 
    </div>
  )
}

export default Retour