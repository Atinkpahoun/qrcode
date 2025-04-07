import React from 'react';
import AnimationIcones from '../composants/AnimationIcones';
import HeroSection from '../composants/Animate';
import Ilustration from '/public/assets/ilustration.png'
import TypewriterEffect from '../composants/Typewriter'


const Accueil = () => {
    return (
        <section className=' '>
            <div className='flex flex-col sm:flex-row  space-y-4 space-x-2 py-8 lg:py-10'>
            
                <div className='flex flex-col space-y-4 w-full items-center pt-0 lg:pt-4'>
                    <TypewriterEffect />
                    <p className=' text-center md:text-start lg:text-lg w-72 py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="font-bold rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <div
                     className=''>
                    <img src={Ilustration} alt="" className=' md:w-[700px]' />
                </div>
            </div>
        </section>
    );
};

export default Accueil;
