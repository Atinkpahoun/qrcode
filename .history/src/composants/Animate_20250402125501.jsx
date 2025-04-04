import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/public/assets",
  "https://framerusercontent.com/images/QVKFKT3dyGxloXfzzpurVKNMM6M.jpg?scale-down-to=1024",
  "https://i.pinimg.com/736x/0f/fc/b0/0ffcb02667af622b89ec3b5aab098a39.jpg",
  "https://i.pinimg.com/236x/97/94/1b/97941b46a1827953f434407dbf1902c8.jpg",
  "https://en.yutong.com/res/res/image/block/banner/20251/d6117c730acc4bba83c9f75a4d75d80d.jpg",
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Passer à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Passer à l'image précédente
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Images avec transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Bouton précédent */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Bouton suivant */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}

export default HeroSection;
