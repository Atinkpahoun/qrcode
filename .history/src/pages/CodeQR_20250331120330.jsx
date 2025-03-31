import React, { useState } from 'react';
import { FaLink, FaEnvelope, FaFont, FaPhone, FaImage } from 'react-icons/fa';
import Url from "../components/url.jsx";
import Email from "../components/email.jsx";
import Texte from "../components/texte.jsx";
import Tel from "../components/tel.jsx";
import Img from "../components/Image.jsx";

const Principale = () => {
  const sections = [
    { id: 'section1', content: <Url /> },
    { id: 'section2', content: <Email /> },
    { id: 'section3', content: <Texte /> },
    { id: 'section4', content: <Tel /> },
    { id: 'section5', content: <Img /> },
  ];

  const [visibleSection, setVisibleSection] = useState('section1');
  
  const showSection = (sectionId) => {
    setVisibleSection(sectionId);
  };
  
  return (
    <section className='text-center doto'>
      <h1 className='pt-5 md:pt-10 font-medium text-2xl md:text-3xl'>
        Obtenez votre code QR en quelques clics sur <em className='text-[#0000FF] font-bold '>QR Easy</em>
      </h1>
      <div className='flex flex-wrap justify-center gap-10 pt-10 md:pt-16'>
        <div className='bg-blue-50 rounded-3xl px-6 md:px-4 py-3 md:py-10 h-auto md:h-1/2'>
          <ul className='flex md:inline'>
            <li className='pb-0 md:pb-10'>
              <button onClick={() => showSection('section1')}>
                <FaLink size={20} color="blue" />
              </button>
            </li>
            <li className='pb-0 px-8 md:px-0 md:pb-10'>
              <button onClick={() => showSection('section2')}>
                <FaEnvelope size={20} color="blue" />
              </button>
            </li>
            <li className='pb-0 md:pb-10'>
              <button onClick={() => showSection('section3')}>
                <FaFont size={20} color="blue" />
              </button>
            </li>
            <li className='pb-0 px-8 md:px-0 md:pb-10'>
              <button onClick={() => showSection('section4')}>
                <FaPhone size={20} color="blue" />
              </button>
            </li>
            <li>
              <button onClick={() => showSection('section5')}>
                <FaImage size={20} color="blue" />
              </button>
            </li>
          </ul>
        </div>
        <div>
          {sections.find(section => section.id === visibleSection)?.content}
        </div>
      </div>
    </section>
  );
};

export default Principale;
