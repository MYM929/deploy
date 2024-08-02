import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MapImage from '../assets/MapImage/Screenshot 2024-08-01 004601.png';

import DallasNBA from '../assets/CityImageNBA/dallas.png';

const Home = () => {
  const navigate = useNavigate();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const updateDimensions = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  useEffect(() => {
    console.log('Image dimensions:', imageDimensions);
    console.log('Updated container dimensions:', containerDimensions);

    // 2812 x 1487
  }, [containerDimensions]);

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    // Update dimensions on initial render
    updateDimensions();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageLoad = () => {
    updateDimensions();
  };

  const handleButtonAnimation = () => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          resolve();
        }, 130); 
      }, 130); 
    });
  };

  const handleClick = async () => {
    await handleButtonAnimation();
    navigate('/deploy/city/cityTemplate');
  };

  // Calculate button size based on the conditions
  const buttonSize = containerDimensions.width > imageDimensions.width * 0.3
    ? 50 // Fixed size
    : containerDimensions.width * 50/(2812*0.3); 

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/3 flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-center">
          Hi, my name is Yongming <br />
          <span className="mt-4 block">Welcome to My Space</span>
        </h1>
      </div>

      <div className="h-1/10 flex flex-col items-center justify-center bg-white">
        <div className="flex space-x-4">
          <button onClick={() => navigate('/deploy/city/dallas')} className="m-2 p-2 bg-blue-500 text-white rounded">
            To Dallas
          </button>
          <button onClick={() => navigate('/deploy/city/boston')} className="m-2 p-2 bg-blue-500 text-white rounded">
            To Boston
          </button>
        </div>
      </div>

      {/* Screen container */}
      <div className="h-1/2 relative flex justify-center bg-gray-200" ref={containerRef}>
        {/* Image container */}
        <div style={{ width: imageDimensions.width * 0.3, height: imageDimensions.height * 0.3 }}>
          <div className="relative">
            <img 
              src={MapImage} 
              alt="Map" 
              ref={imageRef} 
              onLoad={handleImageLoad} 
              className="w-auto h-auto object-contain" 
            />
          <button 
            onClick={() => handleClick()} 
            className={`absolute text-transparent text-white flex flex-col items-center justify-center
                        transform transition-transform 
                       ${isAnimating ? 'scale-150' : 'scale-100'}`}

                      //  hover: duration-300 hover:scale-150
                       
            style={{ 
              top: '70%', 
              left: '40%', 
              width: `${buttonSize}px`,  // Conditional width
              height: `${buttonSize}px`, // Conditional height
              // borderRadius: '50%', // Make the button round
              textAlign: 'center' // Center text horizontally
            }}
          >
            <img src={DallasNBA} alt="" className="" />
            <span className="text-purple-700 font-bold text-sm" style={{ marginTop: '-5px' }}>Dallas</span>
          </button>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


