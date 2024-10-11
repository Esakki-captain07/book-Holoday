import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CatageoryFetcher({ fetchTour, CatageoryKey, title }) {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.tour[CatageoryKey]);
  const status = useSelector((state) => state.tour.status);
  const error = useSelector((state) => state.tour.error);
  const navigate = useNavigate(); 

  const handleView = (tourId) => {
    console.log('Clicked Tour ID:', tourId);
    navigate(`/view-tour/${tourId}`); 
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTour());
    }
  }, [status, dispatch, fetchTour]);


  if (status === 'loading') {
    return <div>...loading</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!categoryData || !Array.isArray(categoryData.data)) {
    return <div>No tours available</div>;
  }

  const tours = categoryData.data;

  return (
    <div className="related-blogs-container">
      <h2>{title}</h2>
      <div className="tour-cards">
        {tours.map((tour) => (
          <div className="card" key={tour._id} onClick={() => handleView(tour._id)}>
            <img 
              src={tour.image} 
              alt={tour.name} 
              className="card-img-top" 
              style={{ height: '170px', objectFit: 'cover' }} 
            />
            <div className="card-body">
              <h5 className="card-title">{tour.name}</h5>
              <p className="card-text"><strong>Location:</strong> {tour.location}</p>
              <p className="card-text"><strong>Start Date:</strong> {tour.startDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatageoryFetcher;
