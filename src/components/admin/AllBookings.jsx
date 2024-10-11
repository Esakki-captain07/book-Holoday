import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function AllBookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getData = async () => {
    try {
      const response = await AxiosService.get(ApiRoutes.GET_ALL_BOOKINGS.path, {
        authenticate: ApiRoutes.GET_ALL_BOOKINGS.auth,
      });
      setData(response.data);
    } catch (error) {
      setError(error.message || 'Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <TopBar />
      <h1>Bookings</h1>
      <div className="table-container">
        <div className="responsive-table">
          <div className="table-header">
            <div>Customer Name</div>
            <div>Mobile</div>
            <div>Booking Place</div>
            <div>Plan Start Date</div>

            <div>Booking Seats</div>
            <div>Booking Date</div>
          </div>

          {data.map((item, i) => (
            <div key={i} className="table-row">
              <div>{item.customerName}</div>
              <div>{item.mobile || 'NA'}</div>
              <div>{item.tourId?.name || 'Tour name not available'}</div>
              <div>{item.tourId?.startDate || 'Tour name not available'}</div>

              <div>{item.bookingSeats}</div>
              <div>{formatDate(item.createdAt)}</div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllBookings;
