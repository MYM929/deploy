import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MapImage from '../assets/MapImage/Screenshot 2024-07-25 223609.png';

const Home = () => {
  const navigate = useNavigate();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  }, []);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

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
          <button onClick={() => navigate('/city/dallas')} className="m-2 p-2 bg-blue-500 text-white rounded">
            To Dallas
          </button>
          <button onClick={() => navigate('/city/boston')} className="m-2 p-2 bg-blue-500 text-white rounded">
            To Boston
          </button>
        </div>
      </div>

      {/* Screen container */}
      <div className="h-1/2 relative flex justify-center bg-gray-200">
        {/* Image container */}
        <div style={{ width: imageDimensions.width*0.3, height: imageDimensions.height*0.3 }}>
          <div className="relative">
            <img 
              src={MapImage} 
              alt="Map" 
              ref={imageRef} 
              onLoad={handleImageLoad} 
              className="w-auto h-auto object-contain" 
            />
          <button 
            onClick={() => navigate('/city/dallas')} 
            className="absolute bg-red-500 text-white flex items-center justify-center"
            style={{ 
              top: '70%', 
              left: '40%', 
              width: `${imageDimensions.width * 0.05 * 0.3}px`,  // 5% of the image width and scaled down by 0.3
              height: `${imageDimensions.width * 0.05 * 0.3}px`, // 5% of the image height and scaled down by 0.3
              borderRadius: '50%', // Make the button round
              textAlign: 'center' // Center text horizontally
            }}
          >
            Dallas
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
