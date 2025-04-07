
import React from 'react';
import AnimationIcones from '../composants/AnimationIcones';
import TypewriterEffect from '../composants/Typewriter';
import HeroSection from '../composants/Animate';


const Accueil = () => {
    return (
        <section style={{ backgroundImage: "url('https://i.pinimg.com/736x/0f/fc/b0/0ffcb02667af622b89ec3b5aab098a39.jpg')" }}>
            <div className='flex flex-wrap justify-center gap-y-4 gap-x-2 md:gap-6 xl:gap-x-32 py-8 lg:py-10'>
                <div className='pt-0 lg:pt-4 text-center lg:text-start'>
                    <TypewriterEffect />
                    <p className='text-md lg:text-lg w-72 py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="bg-[#0000FF] text-white font-bold px-4 py-2 rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <div className='pt-0 lg:pt-8'>
                </div>
            </div>
        </section>
    );
};

export default Accueil;
