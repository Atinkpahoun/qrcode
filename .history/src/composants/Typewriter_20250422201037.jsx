import React from "react";
import { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Ajustez la valeur selon vos besoins
        };

        // Écouter les changements de taille de la fenêtre
        window.addEventListener('resize', handleResize);
        
        // Appeler la fonction une fois pour définir l'état initial
        handleResize();

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center sm:text-start text-[#0000FF]  ">
      {displayedText}
      <span style={{ display: isMobile ? 'none' : 'inline' }} className="animate-pulse">|</span>

    </h1>
  );
};

export default function TypewriterEffect() {
  return (
    <div className="max-w-[600px] pb-4 doto ">
      <Typewriter  text="Générez facilement vos codes QR avec QREasy" speed={50} />
    </div>
  );
}
