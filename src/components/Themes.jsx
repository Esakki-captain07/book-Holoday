import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import { fetchBeach } from './redux/GetTourRequest.jsx';
import CatageoryFetcher from './CatageoryFetcher.jsx';
import { useDispatch } from 'react-redux';
import BAHRAIN from '../assets/img/BAHRAIN.jpg';
import FETHIYE from '../assets/img/FETHIYE.jpg';
import HANOI from '../assets/img/HANOI.jpg';
import MUSCAT from '../assets/img/MUSCAT.jpg';
import ROME from '../assets/img/ROME.jpg';
import UAE from '../assets/img/UAE.jpg';

function Themes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeach());
  }, [dispatch]);



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
      <TopBar />
      <div className='top-wrapper'>
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`} 
            style={{ width: '100%', height: '500px' }} 
          />
        </div>
      <div className="container explore-beach">
        <CatageoryFetcher
          fetchTour={fetchBeach}
          CatageoryKey="beach"
          title="Top Beaches"
        />
      </div>
    </>
  );
}

export default Themes;
