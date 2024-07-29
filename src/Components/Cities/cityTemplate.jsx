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
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [translateX, setTranslateX] = useState(0);

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      thumbnailsRef.current[newIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      return newIndex;
    });
    setTranslateX(0);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      thumbnailsRef.current[newIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      return newIndex;
    });
    setTranslateX(0);
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

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX.current = startX.current;
    setTranslateX(0); // Ensure transition is reset
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    requestAnimationFrame(() => {
      setTranslateX(deltaX);
    });
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    const deltaX = currentX.current - startX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handlePreviousImage();
      } else {
        handleNextImage();
      }
    }
    isDragging.current = false;
    setTranslateX(0);
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    container.addEventListener('mousedown', handleDragStart);
    container.addEventListener('mousemove', handleDragMove);
    container.addEventListener('mouseup', handleDragEnd);
    container.addEventListener('mouseleave', handleDragEnd);
    container.addEventListener('touchstart', handleDragStart);
    container.addEventListener('touchmove', handleDragMove);
    container.addEventListener('touchend', handleDragEnd);
    container.addEventListener('touchcancel', handleDragEnd);

    return () => {
      container.removeEventListener('mousedown', handleDragStart);
      container.removeEventListener('mousemove', handleDragMove);
      container.removeEventListener('mouseup', handleDragEnd);
      container.removeEventListener('mouseleave', handleDragEnd);
      container.removeEventListener('touchstart', handleDragStart);
      container.removeEventListener('touchmove', handleDragMove);
      container.removeEventListener('touchend', handleDragEnd);
      container.removeEventListener('touchcancel', handleDragEnd);
    };
  }, []);

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
        <div className="h-[65vh] w-full flex items-center justify-center relative" ref={imageContainerRef}>
          <img 
            src={images[currentIndex]} 
            alt="" 
            className="h-full w-auto object-contain transition-transform duration-200 ease-out" 
            style={{ transform: `translateX(${translateX}px)` }} 
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
              className={`h-full w-auto object-contain cursor-pointer ${currentIndex === index ? 'border-4 border-blue-500' : ''}`}
              onClick={() => {
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
