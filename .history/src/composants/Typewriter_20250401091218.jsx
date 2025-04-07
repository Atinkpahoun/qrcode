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
    <h1 className="text-2xl text-start font-mono text-[#0000FF] p-4 rounded-md">
      {displayedText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default function TypewriterEffect() {
  return (
    <div className="flex  w-[500px] h-20">
      <Typewriter text="Générez facilement vos codes QR avec QREasy" speed={50} />
    </div>
  );
}
