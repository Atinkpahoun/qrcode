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
    <section className='text-center doto pt-12 md:pt-14 lg:pt-16 xl:pt-20'>
      
      <div className='    space-y-5  pt-10 md:pt-16'>
        <div className='bg-blue-50 rounded-3xl   py-3  w-auto md:w-1/2  mx-auto '>
          <ul className='flex space-x-10 md:space-x-16 lg:space-x-20 xl:space-x-28  items-center justify-center'>
            <li >
              <button onClick={() => showSection('section1')}>
                <FaLink size={20} color="blue" />
              </button>
            </li>
            <li >
              <button onClick={() => showSection('section2')}>
                <FaEnvelope size={20} color="blue" />
              </button>
            </li>
            <li >
              <button onClick={() => showSection('section3')}>
                <FaFont size={20} color="blue" />
              </button>
            </li>
            <li >
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
        <div >
          {sections.find(section => section.id === visibleSection)?.content}
        </div>
      </div>
    </section>
  );
};

export default Principale;
