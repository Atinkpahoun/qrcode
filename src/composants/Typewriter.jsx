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

  return (
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center sm:text-start text-[#0000FF]  ">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default function TypewriterEffect() {
  return (
    <div className="max-w-[600px] pb-4 doto">
      <Typewriter  text="Générez facilement vos codes QR avec QREasy" speed={50} />
    </div>
  );
}
