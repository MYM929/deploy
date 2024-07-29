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
  const [isAnimating, setIsAnimating] = useState(false);
  const imageContainerRef = useRef(null);
  const thumbnailsRef = useRef([]);

  const handlePreviousImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + images.length) % images.length;
        thumbnailsRef.current[newIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        setIsAnimating(false);
        return newIndex;
      });
    }, 500);
  };

  const handleNextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        thumbnailsRef.current[newIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        setIsAnimating(false);
        return newIndex;
      });
    }, 500);
  };

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

  return (
    <div className="min-h-screen flex flex-col">

      {/* Heading */}
      <div className="flex items-center justify-center h-[10vh] bg-blue-300">
        <h1 className="text-4xl font-bold">Welcome to Dallas</h1>
      </div>

      {/* Middle */}
      <div className="flex flex-row">
        <div 
          className="w-[5%] h-[65vh] bg-red-400 flex items-center justify-center cursor-pointer"
          onClick={handlePreviousImage}
        >
          <h1>Prev</h1>
        </div>
        <div className="h-[65vh] w-full flex items-center justify-center relative overflow-hidden" ref={imageContainerRef}>
          <img 
            src={images[currentIndex]} 
            alt="" 
            className={`h-full w-auto object-contain transition-transform duration-500 ${isAnimating ? 'animate-slide-in-right' : ''}`} 
          />
          {isFullscreen && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
              >
                Prev
              </button>
              <button
                onClick={handleNextImage}
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
          className="w-[5%] h-[65vh] bg-blue-400 flex items-center justify-center cursor-pointer"
          onClick={handleNextImage}
        >
          <h1>Next</h1>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col">
        <div className="h-[5vh] bg-green-400 flex items-center justify-between px-4">
          <h1>hello1</h1>
          <button onClick={handleFullscreen} className="bg-gray-800 text-white px-2 py-1 rounded">Fullscreen</button>
        </div>
        <div className="h-[20vh] bg-pink-400 flex items-center overflow-x-auto space-x-2 px-2">
          {images.map((image, index) => (
            <img
              key={index}
              ref={el => thumbnailsRef.current[index] = el}
              src={image}
              alt={`thumbnail-${index}`}
              className={`h-full w-auto object-contain cursor-pointer hover:border-4 hover:border-blue-500 ${currentIndex === index ? 'border-4 border-blue-500' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                thumbnailsRef.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
              }}c
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityTemplate;
