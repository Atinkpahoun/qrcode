import React from 'react';
import AnimationIcones from '../composants/AnimationIcones';
import HeroSection from '../composants/Animate';
import Ilustration from '/public/assets/ilustration.png'



const Accueil = () => {
    return (
        <section className=' '>
            <div className='flex flex-col justify-between md:flex-row space-y-4 space-x-2 md:gap-6 xl:gap-x-32 py-8 lg:py-10'>
            
                <div className='flex flex-col space-y-4 justify-center items-start pt-0 lg:pt-4'>
                    <
                    <p className=' text-center md:text-start text-lg lg:text-lg w-72 py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="font-bold rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <div
                     className=' items-end'>
                    <img src={Ilustration} alt="" width={500} />
                </div>
            </div>
        </section>
    );
};

export default Accueil;
