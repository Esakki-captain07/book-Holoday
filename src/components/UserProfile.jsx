import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import AxiosService from './utils/AxiosService';

function UserProfile() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchBookings = async () => {
          setLoading(true);
          setError('');
  
          try {
              const token = localStorage.getItem('token');
  
              if (!token) {
                  throw new Error('User is not authenticated. Token is missing.');
              }
  
              const {data} = await AxiosService.get('/tour/user-booked-status', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
  
              if (data) {
                  console.log('Bookings:', data);
                  setBookings(data);
              } else {
                  setError('No bookings found for this user.');
              }
          } catch (err) {
              setError('Failed to fetch bookings. Please try again later.');
              console.error('API request failed:', err);
          } finally {
              setLoading(false);
          }
      };
  
      fetchBookings();
  }, []);
  

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <TopBar />
            <h1>User Profile</h1>
            {loading && <p>Loading bookings...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="table-container">
                <div className="responsive-table">
                    <div className="table-header">
                        <div>Customer Name</div>
                        <div>Mobile</div>
                        <div>Tour Name</div>
                        <div>Start Date</div>
                        <div>Booked Seats</div>
                        <div>Booked Date</div>
                    </div>

                    {bookings.length > 0 ? (
    bookings.map((item, i) => (
        <div key={i} className="table-row">
            <div data-label="Customer Name">{item.customerName || 'Customer name not available'}</div>
            <div data-label="Mobile">{item.mobile || 'NA'}</div>
            <div data-label="Tour Name">{item.tourId?.name || 'Tour name not available'}</div>
            <div data-label="Start Date">{item.tourId?.startDate ? formatDate(item.tourId.startDate) : 'Start date not available'}</div>
            <div data-label="Booked Seats">{item.bookingSeats || '0'}</div>
            <div data-label="Booked Date">{item.createdAt ? formatDate(item.createdAt) : 'Date not available'}</div>
        </div>
    ))
) : (
    <p>No bookings available.</p>
)}
                </div>
            </div>
        </>
    );
}

export default UserProfile;
