import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ToolsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tools = [
    {
      name: "Cyber Surakshit Bharat",
      icon: "/Tools/csb.png"
    },
    {
      name: "Digital India",
      icon: "/Tools/digital-india.jpg"
    },
    {
      name: "India AI Mission",
      icon: "/Tools/india_ai.jpg"
    },
    {
      name: "Make in India",
      icon: "/Tools/mii.png"
    },
    {
      name: "PMKVY",
      icon: "/Tools/pmkvy.jpg"
    },
    {
      name: "Samarth Udyog 4.0",
      icon: "/Tools/samarth_udyog.jpg"
    },
    {
      name: "TUFS",
      icon: "/Tools/tufs.png"
    }
  ];

  const getCardClasses = (offset) => {
    const positions = [
      { scale: 'scale-75', position: 'left-[20%] -translate-x-1/2', zIndex: 'z-10', opacity: 'opacity-30' },
      { scale: 'scale-90', position: 'left-[35%] -translate-x-1/2', zIndex: 'z-20', opacity: 'opacity-60' },
      { scale: 'scale-100', position: 'left-1/2 -translate-x-1/2', zIndex: 'z-30', opacity: 'opacity-100' }, // Changed scale to 100% for the active card
      { scale: 'scale-90', position: 'right-[35%] translate-x-1/2', zIndex: 'z-20', opacity: 'opacity-60' },
      { scale: 'scale-75', position: 'right-[20%] translate-x-1/2', zIndex: 'z-10', opacity: 'opacity-30' },
    ];

    const normalizedOffset = ((offset % tools.length) + tools.length) % tools.length;
    const currentPosition = positions[normalizedOffset] || { scale: 'scale-0', position: '', zIndex: 'z-0', opacity: 'opacity-0' };

    // Decrease the card width and height here (adjust as needed)
    return `absolute transition-all duration-500 ease-in-out transform bg-white shadow-xl rounded-xl text-center overflow-hidden 
      w-64 h-[350px] ${currentPosition.scale} ${currentPosition.position} ${currentPosition.zIndex} ${currentPosition.opacity}`;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tools.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tools.length) % tools.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id="schemes" className="relative w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-70">
      <h2 className="mt-4 text-3xl text-white font-bold text-center">Government Schemes</h2>
      </div>
      <div className="mt-8 relative w-full max-w-7xl h-full flex items-center justify-center">
        <button 
          onClick={prevSlide}
          className="absolute left-12 z-40 bg-white/20 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white/40 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous slide"
        >
          <ChevronLeft size={40} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-12 z-40 bg-white/20 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white/40 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next slide"
        >
          <ChevronRight size={40} />
        </button>
        {tools.map((tool, index) => (
          <div 
            key={index} 
            className={getCardClasses(index - currentIndex)}
          >
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-lg bg-white shadow-inner">
                <img 
                  src={tool.icon} 
                  alt={tool.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-95"
                />
              </div>

              <h2 className="font-bold mb-4 truncate w-full text-base line-clamp-3 text-gray-800">{tool.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Remove the blue dots (pagination indicators) */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {tools.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              index === currentIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ToolsCarousel;
