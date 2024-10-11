import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CatageoryFetcher from './CatageoryFetcher.jsx';
import AxiosService from './utils/AxiosService.jsx';
import { honeymoonPackeages, fetchTopRated, fetchTour } from './redux/GetTourRequest.jsx';

function ContentBody() {
  const [data, setData] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Turkey');
  const navigate = useNavigate();

  const countries = ['Turkey', 'Saudi', 'Oman', 'India', 'Egypt'];

  // Fetch all programs data
  const getData = async () => {
    try {
      const {data} = await AxiosService.get('/program/all-programs');
      console.log('All Programs Data:',data);  // Check the structure
      setData(data); // Ensure you're setting the correct array
    } catch (error) {
      console.error("Error fetching all programs", error);
    }
  };

  // Fetch details for a selected country
  const fetchCountryData = async (country) => {
    try {
      const {data} = await AxiosService.get(`/program/country?country=${country}`);
      setCountryDetails(data); // Ensure this is the correct data path
      console.log('Country Details:', data); // Inspect the structure
    } catch (error) {
      console.error("Error fetching country details", error);
    }
  };
  useEffect(() => {
    getData(); // Fetch all programs when component mounts
  }, []);

  useEffect(() => {
  fetchCountryData(selectedCountry);
  console.log('Selected Country:', selectedCountry);  // Log country on change
}, [selectedCountry]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleView = (tourId) => {
    console.log('Clicked Tour ID:', tourId);
    navigate(`/view-tour/${tourId}`);
  };

  const themesData = [
    {
      title: "Beaches And Islands",
      image: "https://media.holidify.com/images/cmsuploads/compressed/acj-2211-most-romantic-honeymoon-destinations-in-india-6_20240809154843.jpg",
      path: '/themes-explore'
    },
    {
      title: "Hill Stations",
      image: "https://www.holidify.com/images/cmsuploads/compressed/Munnar_hillstation_kerala_20190207123437jpg",
      path: '/hill-stations'
    },
    {
      title: "Adventures",
      image: "https://www.holidify.com/images/cmsuploads/compressed/skyvacationtravelrecreationyoungferriswheel779504pxhere.com_20201013134405.jpg",
      path: '/adventures'
    },
    {
      title: "Religious",
      image: "https://www.holidify.com/images/compressed/13201.jpg",
      path: '/religious'
    },
    {
      title: "Heritage",
      image: "https://www.holidify.com/blog/wp-content/uploads/2014/06/Konark.jpg",
      path: '/heritage'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;
  const totalItems = themesData.length;

  const handleNext = () => {
    if (currentIndex + itemsToShow < totalItems) {
      setCurrentIndex(currentIndex + itemsToShow);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsToShow >= 0) {
      setCurrentIndex(currentIndex - itemsToShow);
    }
  };

  return (
    <div className="container content-body">
    <div className="content-left-wrapper">
      <h1>Countries you can explore</h1>
      <div className="container">
      <ul className="ms-auto ul-li" style={{ display: 'flex', justifyContent: 'space-around' }}>
{countries.map((country) => (
  <li
    key={country}
    onClick={() => handleCountryClick(country)}
    style={{
      cursor: 'pointer',
      fontWeight: selectedCountry === country ? 'bold' : 'normal',
      color: selectedCountry === country ? 'blue' : 'black',
      borderBottom: selectedCountry === country ? '2px solid blue' : 'none'
    }}
  >
    {country}
  </li>
))}
</ul>
      </div>

        <hr />

        {/* Country-specific tours */}
        <div className="country-card">
  {countryDetails && countryDetails.map((tour) => (
    <div className="card" key={tour._id} onClick={() => handleView(tour._id)}>
      <img src={tour.image} className="card-img-top"  alt={tour.name} style={{width:'260px'}}/>
      <div className="card-body">
        <h6 className="card-title" style={{ marginRight: '10px' }}>{tour.name}</h6>
      </div>
    </div>
  ))}
</div>

        <hr />
        {/* Fetching and displaying tours */}
        <CatageoryFetcher fetchTour={fetchTour} CatageoryKey="tour" title="Upcoming Tours" />
        
        <hr />
        <CatageoryFetcher fetchTour={fetchTopRated} CatageoryKey="topRated" title="Top Rated Places" />
        <hr />
        <CatageoryFetcher fetchTour={honeymoonPackeages} CatageoryKey="honeymoon" title="Top Honeymoon Places in India" />
        <hr />

        {/* Themes Section */}
        <div className="home-themes">
          <h1>Themes you can explore</h1>
          <div className="related-blogs-container">
            <div className="tour-cards">
              {themesData.slice(currentIndex, currentIndex + itemsToShow).map((theme, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => navigate(theme.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="card-img-top"
                    style={{ height: '170px', objectFit: 'cover' }}
                    onError={(e) => (e.target.src = 'default-image-url.jpg')}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{theme.title}</h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="navigation-buttons">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="slick-prev"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + itemsToShow >= totalItems}
                className="slick-next"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - All Programs */}
      <div className="content-right-wrapper">
        <div className="right-content-wrapper" style={{ marginLeft: '10px' }}>
          <h5>All Programs</h5>
          {Array.isArray(data) && data.length > 0 ? (
  data.map((program) => (
    <div className="right-card" key={program._id} onClick={() => handleView(program._id)}>
      <div className="right-card" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <img src={program.image} style={{ width: '150px', height: '150px' }} alt={program.name} />
        <p>{program.name}</p>
      </div>
    </div>
  ))
) : (
  <p>No programs available.</p>
)}
        </div>
      </div>
    </div>
  );
}

export default ContentBody;
