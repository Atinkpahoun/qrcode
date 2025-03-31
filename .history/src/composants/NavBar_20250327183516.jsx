import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode } from 'react-icons/fa';
const NavBar = () => {
  return (
    <nav className='justify-between flex flex-wrap px-3 md:px-10 py-3 md:py-5 bg-blue-50 doto'>
        <div className='flex gap-x-1 items-center'>
            <FaQrcode size={25}  color="blue" />
            <h1 className='font-bold text-[#0000FF] text-2xl '><Link to="/Principale"> QR Easy </Link></h1>
        </div>
        <ul className='flex text-[#0000FF] gap-x-5 text-lg font-bold'>
            <li ><Link to ="/Accueil ">Accueil</Link></li>
            <li><Link to="/Inscription">Inscription</Link></li>
            <li><Link to="/Connexion">Connexion</Link></li>
            <li><Link to ="/CodeQR">CodeQR</Link></li>
            <li ><Link to ="/Historique">Historique</Link></li>
        </ul>
    </nav>
  );
};


export default NavBar;
