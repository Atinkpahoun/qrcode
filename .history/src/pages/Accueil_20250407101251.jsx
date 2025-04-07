import React from 'react';
import Ilustration from '/public/assets/ilustration.png'
import TypewriterEffect from '../composants/Typewriter'


const Accueil = () => {
    return (
        <section className=''>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4'>
            
                <div className='flex flex-col space-y-4 w-full items-center pt-0 lg:pt-4'>
                    <TypewriterEffect />
                    <p className=' text-center md:text-start lg:text-lg w-72 py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="font-bold rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <div>
                    <img src={Ilustration} alt="" className=' md:w-[900px]' />
                </div>
            </div>

            <div>
                <div></div>

                <div>
                    <h1>
                        
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Accueil;
