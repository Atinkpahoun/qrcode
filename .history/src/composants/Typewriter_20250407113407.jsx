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
    <h1 className="text-3xl lg:text-4xl font-bold tec text-[#0000FF]  ">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default function TypewriterEffect() {
  return (
    <div className="h-20 max-w-[500px] pb-4">
      <Typewriter text="Générez facilement vos codes QR avec QREasy" speed={50} />
    </div>
  );
}
