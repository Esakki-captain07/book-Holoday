import React, { useEffect, useState } from 'react';
import BAHRAIN from '../assets/img/BAHRAIN.jpg';
import FETHIYE from '../assets/img/FETHIYE.jpg';
import HANOI from '../assets/img/HANOI.jpg';
import MUSCAT from '../assets/img/MUSCAT.jpg';
import ROME from '../assets/img/ROME.jpg';
import UAE from '../assets/img/UAE.jpg';

function Header() {
  const images = [
    BAHRAIN,
    FETHIYE,
    HANOI,
    MUSCAT,
    ROME,
    UAE
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="container">
        <div className='top-wrapper'>
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`} 
            style={{ width: '100%', height: '500px' }} 
          />
        </div>
        <div className="bottom-wrapper">
          <h1 className="header-title" style={{ textAlign: 'center', marginTop: '-142px' }}>
            Holify With Us
          </h1>
          <h3 className='sub-heading' style={{ textAlign: 'center' ,color:'white' }}>
            Discover your next holiday destination
          </h3>
          <input className='home-input' placeholder='Search Places' type="text" />
        </div>
      </div>
    </>
  );
}

export default Header;
