
import React from 'react';
import AnimationIcones from '../composants/AnimationIcones';
import TypewriterEffect from '../composants/Typewriter';
import HeroSection from '../composants/Animate';
import Ilustration from '/public/assets/café.gif'


const Accueil = () => {
    return (
        <section>
            <div className='flex flex-col items-center md:flex-row justify-center gap-y-4 gap-x-2 md:gap-6 xl:gap-x-32 py-8 lg:py-10'>
            
                <div className='flex flex-col justify-center items-center pt-0 lg:pt-4 text-center'>
                    <TypewriterEffect />
                    <p className='text-md lg:text-lg w-72 py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <div
                     className=' hidden md:block'>
                    <img src={Ilustration} alt="" width={300} height={40} />
                </div>
                <div className=' md:hidden'>
                    <img src={Ilustration} alt="" width={200} height={40} />
                </div>
            </div>
        </section>
    );
};

export default Accueil;
