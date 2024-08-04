import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MapImage from '../assets/MapImage/Screenshot 2024-08-01 004601.png';

import { CityData } from '../../src/cityData'; 

const Home = () => {
  const navigate = useNavigate();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
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

  // Calculate button size based on the conditions
  const buttonSize = containerDimensions.width > imageDimensions.width * 0.3
    ? 80 // Fixed size
    : containerDimensions.width * 80/(2812*0.3); 

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/5 flex items-center justify-center bg-blue-300">
        <h1 className="text-3xl font-bold text-center">
          Hi, my name is Yongming <br />
          <span className="mt-4 block">Welcome to My Space</span>
        </h1>
      </div>

      {/* Screen container */}
      <div className="h-1/2 relative flex justify-center" ref={containerRef}>
        {/* Image container */}
        <div style={{ width: imageDimensions.width * 0.5, height: imageDimensions.height * 0.5 }}>
          <div className="relative">
            <img 
              src={MapImage} 
              alt="Map" 
              ref={imageRef} 
              onLoad={handleImageLoad} 
              className="w-auto h-auto object-contain" 
              style={{ opacity: 0.8 }}
            />


            <CityIconButton cityName={CityData.Dallas.cityName} cityIcon={CityData.Dallas.cityIcon} top='65%' left='39%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.OklahomaCity.cityName} cityIcon={CityData.OklahomaCity.cityIcon} top='40%' left='39%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.Houston.cityName} cityIcon={CityData.Houston.cityIcon} top='70%' left='53%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.NewYork.cityName} cityIcon={CityData.NewYork.cityIcon} top='1%' left='83%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.Boston.cityName} cityIcon={CityData.Boston.cityIcon} top='25%' left='74%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.SanFrancisco.cityName} cityIcon={CityData.SanFrancisco.cityIcon} top='20%' left='7%' buttonSize={buttonSize} navigate={navigate}/>
            <CityIconButton cityName={CityData.LosAngeles.cityName} cityIcon={CityData.LosAngeles.cityIcon} top='65%' left='13%' buttonSize={buttonSize} navigate={navigate}/>




          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const CityIconButton = ({ cityName, cityIcon, top, left, buttonSize, navigate}) => {


  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);

  const handleButtonAnimation = () => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      setIsHoverEnabled(false); 
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setIsHoverEnabled(true);
          resolve();
        }, 130);
      }, 130);
    });
  };


  const handleClick = async () => {
    await handleButtonAnimation();
    const cityNameWithoutSpaces = cityName.replace(/\s+/g, '').toLowerCase();
    navigate(`/city/${cityNameWithoutSpaces}`);
  };


  return (
    <button
      onClick={() => handleClick()}
      className={`absolute text-transparent text-white flex flex-col items-center justify-center
                  transform transition-transform
                  ${isHoverEnabled ? 'hover:scale-150' : ''}
                  ${isAnimating ? 'scale-150' : 'scale-100'}`}
      style={{
        top: top,
        left: left,
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        textAlign: 'center',
      }}
    >
      <img src={cityIcon} alt={`${cityName} icon`} className="" />
      <span className="text-purple-700 font-bold" style={{ fontSize: '12px',  marginTop: '-5px', whiteSpace: 'nowrap'}}>{cityName}</span>
    </button>
  );
};