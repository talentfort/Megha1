import React, { useState, useEffect } from 'react';
import  slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2jpg.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4jpg.jpg';
import slide5 from '../assets/slide5.jpg';
import slide6 from '../assets/slide6.jpg';
import slide7 from '../assets/slide7.jpg';
import slide8 from '../assets/slide8.jpg';
import slide9 from '../assets/slide9.jpg';
import slide10 from '../assets/slide10.jpg';
import slide11 from '../assets/slide11.jpg';
import footer from '../assets/footer.png';

function Home() {
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
   <div>
     <div>
  <div className='max-w-[700px] h-[500px] w-full m-auto py-16 px-4 relative'>
    <div className='relative w-full h-full overflow-hidden'>
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  </div>
</div>



    <div>
      <img src={footer}/>
    </div>

   </div>
  );
}

export default Home;

