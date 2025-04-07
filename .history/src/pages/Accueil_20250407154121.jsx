import React from 'react';
import Ilustration from '/public/assets/ilustration.png'
import TypewriterEffect from '../composants/Typewriter'
import { useInView } from 'react-intersection-observer';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const Accueil = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    return (
        <section className=''>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4'>
            
                <div className=' 2xl:pl-40 flex flex-col items-center sm:items-start w-full pt-10 lg:pt-4 px-6'>
                    <TypewriterEffect />
                    <p className='pt-4 md:pt-5 text-center sm:text-start lg:text-lg max-w-[500px] py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <button className="bg-[#0000FF] text-white px-4 py-1 text-start font-bold rounded-lg doto text-lg"><a href="/src/pages/CodeQR.jsx">Commencer</a></button>
                </div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 3, ease: "easeOut", bounce: 0.3 }}>
                    <img src={Ilustration} alt="" className=' md:w-[900px]' />
                </motion.div>
            </div>

            <div className='flex justify-between bg-blue-50 mx-5 md:mx-14 rounded-3xl mt-5 mb-14'>
                <div className='hidden md:block max-w-[520px] max-h-[450px] invisible'>Choose QRL Pixel for its easy QR code generation, customizability with colors and logos, and advanced tracking features. Monitor scans in real-time, including location and device data, all within an intuitive, user-friendly interface. Perfect for businesses and marketers seeking efficient, insightful QR code management.</div>

                <div className='flex flex-col space-y-4 max-w-[520px] max-h-[450px] p-6'>
                    <h1 className='text-[#0000FF] text-[24px] lg:text-[40px] font- max-w-[300px]'>Why you choose QRL Pixel</h1>
                    <p className=''>Choose QRL Pixel for its easy QR code generation, customizability with colors and logos, and advanced tracking features. Monitor scans in real-time, including location and device data, all within an intuitive, user-friendly interface. Perfect for businesses and marketers seeking efficient, insightful QR code management.</p>
                </div>
            </div>
        </section>
    );
};
export default Accueil;
