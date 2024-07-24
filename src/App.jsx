import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

import s1 from './assets/TestImage/IMG_20230527_134707.jpg'
import s2 from './assets/TestImage/IMG_20230602_121437.jpg'
import s3 from './assets/TestImage/IMG_20230602_121701.jpg'
import s4 from './assets/TestImage/IMG_20230602_121815.jpg'
import s5 from './assets/TestImage/IMG_20230602_122209.jpg'
import s6 from './assets/TestImage/IMG_20230602_122405.jpg'
import s7 from './assets/TestImage/IMG_20230602_122528.jpg'
import s8 from './assets/TestImage/IMG_20230602_122709.jpg'
import s9 from './assets/TestImage/IMG_20230602_123054.jpg'
import s10 from './assets/TestImage/IMG_20230602_123147.jpg'
import s11 from './assets/TestImage/IMG_20230602_123246.jpg'
import s12 from './assets/TestImage/IMG_20230602_124827.jpg'
import s13 from './assets/TestImage/IMG_20230602_124915.jpg'
import s14 from './assets/TestImage/IMG_20230602_125729.jpg'
import s15 from './assets/TestImage/IMG_20230602_130008.jpg'
import s16 from './assets/TestImage/IMG_20230602_130219.jpg'

function App() {

  const images = [
    { original: s1, thumbnail: s1},
    { original: s2, thumbnail: s2 },
    { original: s3, thumbnail: s3 },
    { original: s4, thumbnail: s4 },
    { original: s5, thumbnail: s5 },
    { original: s6, thumbnail: s6 },
    { original: s7, thumbnail: s7 },
    { original: s8, thumbnail: s8 },
    { original: s9, thumbnail: s9 },
    { original: s10, thumbnail: s10 },
    { original: s11, thumbnail: s11 },
    { original: s12, thumbnail: s12 },
    { original: s13, thumbnail: s13 },
    { original: s14, thumbnail: s14 },
    { original: s15, thumbnail: s15 },
    { original: s16, thumbnail: s16 }
  ];  

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-400">
      <h1 className="text-4xl font-bold mb-8">Welcome to my space</h1>
      <div className="w-1/3">
        <ImageGallery 
          items={images} 
          loading="lazy" 
          thumbnailLoading="lazy"
          thumbnailPosition="right"
          originalHeight="10"
        />
      </div>
    </div>
    </>
  );
}

export default App
