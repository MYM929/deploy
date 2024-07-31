import React, { useState, useRef, useEffect } from 'react';
import s1 from "../../assets/TestImage/IMG_20230602_121815.jpg";
import s2 from "../../assets/TestImage/IMG_20230527_134707.jpg";
import s3 from "../../assets/TestImage/IMG_20230602_121437.jpg";
import s4 from "../../assets/TestImage/IMG_20230602_121701.jpg";
import s5 from "../../assets/TestImage/IMG_20230602_122209.jpg";
import s6 from "../../assets/TestImage/IMG_20230602_122405.jpg";
import s7 from "../../assets/TestImage/IMG_20230602_122528.jpg";
import s8 from "../../assets/TestImage/IMG_20230602_122709.jpg";
import s9 from "../../assets/TestImage/IMG_20230602_123054.jpg";
import s10 from "../../assets/TestImage/IMG_20230602_123147.jpg";
import s11 from "../../assets/TestImage/IMG_20230602_123246.jpg";
import s12 from "../../assets/TestImage/IMG_20230602_124827.jpg";
import s13 from "../../assets/TestImage/IMG_20230602_124915.jpg";
import s14 from "../../assets/TestImage/IMG_20230602_125729.jpg";
import s15 from "../../assets/TestImage/IMG_20230602_130008.jpg";
import s16 from "../../assets/TestImage/IMG_20230602_130219.jpg";


const CityTemplate = () => {
  const images = [
    s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageContainerRef = useRef(null);
  const thumbnailsRef = useRef([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //Image fade in and out
  const [fadeOut, setFateOut] = useState(false);
  const [fadeIn, setFateIn] = useState(false);


  const handleFateOut = () => {
    return new Promise((resolve) => {
      setFateOut(true);
      const fadeOutTime = setTimeout(() => {
        setFateOut(false);
        resolve();
      }, 500); 
  
      return () => {
        clearTimeout(fadeOutTime);
      };
    });
  };
  
  useEffect(() => {
    setFateIn(true);
    const fadeTime = setTimeout(() => {
      setFateIn(false);
    }, 500); 
  
    return () => {
      clearTimeout(fadeTime);
    };
  }, [currentIndex]);
  
  

  const handleChangeImage = async (direction) => {
    await handleFateOut();
  
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + images.length) % images.length;
      return newIndex;
    });
  };
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // Full screen
  const handleFullscreen = () => {
    if (imageContainerRef.current) {
      if (imageContainerRef.current.requestFullscreen) {
        imageContainerRef.current.requestFullscreen();
      } else if (imageContainerRef.current.mozRequestFullScreen) { /* Firefox */
        imageContainerRef.current.mozRequestFullScreen();
      } else if (imageContainerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        imageContainerRef.current.webkitRequestFullscreen();
      } else if (imageContainerRef.current.msRequestFullscreen) { /* IE/Edge */
        imageContainerRef.current.msRequestFullscreen();
      }
    }
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === imageContainerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="min-h-screen flex flex-col" style={{ height: '100dvh' }}>

      {/* Heading */}
      <div className="flex items-center justify-center h-[10svh] bg-blue-300">
        <h1 className="text-4xl font-bold">Welcome to Dallas</h1>
      </div>

      {/* Middle */}
      <div className="flex flex-row flex-grow h-[65svh]">
        <div 
          className="w-[5%] bg-red-400 flex items-center justify-center cursor-pointer"
          onClick={() => handleChangeImage(-1)}
        >
          <h1>Prev</h1>
        </div>
        <div className="relative w-full flex items-center justify-center" ref={imageContainerRef}>
            <img
                src={images[currentIndex]}
                alt=""
                className={`h-full w-auto object-contain rounded-2xl transition-opacity duration-500 
                            ${fadeOut ? 'opacity-0' : 'opacity-100'} 
                            ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            />




          {isFullscreen && (
            <>
              <button
                onClick={() => handleChangeImage(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
              >
                Prev
              </button>
              <button
                onClick={() => handleChangeImage(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
              >
                Next
              </button>
              <button
                onClick={handleExitFullscreen}
                className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded"
              >
                Exit Fullscreen
              </button>
            </>
          )}
        </div>
        <div 
          className="w-[5%] bg-blue-400 flex items-center justify-center cursor-pointer"
          onClick={() => handleChangeImage(1)}
        >
          <h1>Next</h1>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col h-[25svh]">
        <div className="h-[5svh] bg-green-400 flex items-center justify-between px-4">
          <h1>hello1</h1>
          <button onClick={handleFullscreen} className="bg-gray-800 text-white px-2 py-1 rounded">Fullscreen</button>
        </div>
        <div className="h-[20svh] bg-pink-400 flex items-center overflow-x-auto space-x-2 px-2">
          {images.map((image, index) => (
            <img
              key={index}
              ref={el => thumbnailsRef.current[index] = el}
              src={image}
              alt={`thumbnail-${index}`}
              className={`h-full w-auto object-contain cursor-pointer border-4 ${currentIndex === index ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500 transform transition-transform duration-300 hover:scale-95`}
              onClick={async() => {
                await handleFateOut();
                setCurrentIndex(index);
                thumbnailsRef.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityTemplate;
