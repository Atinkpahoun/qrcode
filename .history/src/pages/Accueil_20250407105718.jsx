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

            <div className='flex bg-blue-50 mx-5 md:mx-14 rounded-3xl mt-5       mb-20'>
                <div className='hidden md:block max-w-[520px] max-h-[450px] invisible'>Choose QRL Pixel for its easy QR code generation, customizability with colors and logos, and advanced tracking features. Monitor scans in real-time, including location and device data, all within an intuitive, user-friendly interface. Perfect for businesses and marketers seeking efficient, insightful QR code management.</div>

                <div className='flex flex-col space-y-4 max-w-[520px] max-h-[450px] p-6'>
                    <h1 className='text-[24px] lg:text-[40px] max-w-[300px]'>Why you choose QRL Pixel</h1>
                    <p className=''>Choose QRL Pixel for its easy QR code generation, customizability with colors and logos, and advanced tracking features. Monitor scans in real-time, including location and device data, all within an intuitive, user-friendly interface. Perfect for businesses and marketers seeking efficient, insightful QR code management.</p>
                </div>
            </div>
        </section>
    );
};
export default Accueil;
