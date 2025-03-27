import React from 'react';
import { FaLink } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaFont } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa';
const SideBar = () => {
  return (
    <div className='bg-blue-50 rounded-3xl px-6 md:px-4 py-5 md:py-10'>
      <ul className=' flex md:inline'>
        <li className='pb-0 md:pb-10'><a href="#" ><FaLink size={20} color="blue" /></a></li>
        <li className='pb-0 px-8 md:px-0 md:pb-10'><a href="#"><FaEnvelope size={20} color="blue" /></a></li>
        <li className='pb-0  md:pb-10'><a href="#"><FaFont size={20} color="blue" /></a> </li>
        <li className='pb-0 px-8 md:px-0 md:pb-10'><a href="#"><FaPhone size={20} color="blue" /></a></li>
        <li><a href="#"><FaImage size={20} color="blue" /></a></li>
      </ul>
    </div>
  );
};

export default SideBar;
