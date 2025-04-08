import React from 'react';
import Ilustration from '/src/assets/ilustration.png'
import TypewriterEffect from '../composants/Typewriter'
import ButtonCommencer from '../composants/ButtonCommencer';
import Question from '/src/assets/question.png'
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
            
                <div className='flex flex-col items-center  w-full pt-10 lg:pt-4 px-5'>
                    <TypewriterEffect />
                    <p className='pt-4 sm:pt-10 md:pt-5 text-center lg:text-start lg:text-2xl max-w-[410px] py-5'>Créez, customisez et téléchargez au même endroit vos codes QR en quelques clics.</p>
                    <ButtonCommencer  /> 
                </div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 3, ease: "easeOut", bounce: 0.3 }}>
                    <img src={Ilustration} alt="" className=' md:w-[900px]' />
                </motion.div>
            </div>

            <div className='flex justify-center flex-wrap items-center gap-0 lg:gap-x-16 xl:gap-x-28 bg-blue-50 mx-5 md:mx-14 rounded-3xl mt-5 mb-14'>
                <img src={Question} alt="" className=' w-[200px] lg:w-[320px] xl:w-[380px]' />
                <div className='flex flex-col space-y-4 max-w-[520px] max-h-[450px] p-6 text-center lg:text-start'>
                    <h1 className='text-[#0000FF] text-2xl lg:text-5xl font-semibold max-w-[500px] pb-4 doto '>Pourquoi choisir QREasy?</h1>
                    <p className=' text-normal lg:text-lg '>Choisissez QREasy pour sa génération facile de codes QR, sa personnalisation avec des couleurs et des logos, ainsi que ses fonctionnalités avancées de stockage; le tout sur une  interface fluide et conviviale.</p>
                </div>
            </div>
            <div className='flex flex-col bg-blue-50 mx-5 md:mx-14 rounded-3xl mt-5 mb-14 items-center py-14 lg:py-20'>
                <h1 className='pb-10 lg:pb-16 text-2xl lg:text-5xl text-[#0000FF] doto text-center font-semibold'>Voulez vous générer un code QR?</h1>
                <ButtonCommencer />
            </div>
        </section>
    );
};
export default Accueil;
