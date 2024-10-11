import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import TopBar from './TopBar';
import AxiosService from '../components/utils/AxiosService';
import ApiRoutes from './utils/ApiRoutes';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import ClipLoader from "react-spinners/MoonLoader"; 

function ViewTour() {
    const [viewTour, setViewTour] = useState(null); 
    const { tourId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [mobile, setMobile] = useState("");
    const [bookingSeats, setBookingSeats] = useState("");
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false);


    const getData = async () => {
        setLoading(true)
        try {
            const response = await AxiosService.get(ApiRoutes.VIWETOUR.path.replace(':tourId', tourId));
            setViewTour(response.data);
        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
        finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (tourId) {
            getData();
        }
    }, [tourId]);
    if(loading){
        return <div className='loader-overlay'>
        <ClipLoader color={"#36d7b7"} loading={loading} size={70}aria-label="Loading Spinner" data-testid="loader"/>
        </div>
    }

    if (!viewTour) {
        return <div>Loading...</div>;
    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setBookingLoading(true)
        try {
          const token = localStorage.getItem('token');
      
          if (!token) {
            throw new Error('User not authenticated');
          }
      
          const bookingData = {
            customerName,
            mobile,
            bookingSeats,
            tourId: viewTour._id, 
          };
      
          if (bookingSeats > viewTour.availableSeats) {
            toast(
                `Only ${viewTour.availableSeats} seats are available for this tour.`,
                {
                  duration: 6000,
                }
              );
            return;
          }
      
          const {data,message} = await AxiosService.post(
            ApiRoutes.CREATE_BOOKING.path,
            bookingData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
      
          if (data) {
            toast(
                message,{
                    duration:6000,
                }
            );
          } else {
            console.log(message);
            toast(
                message,{
                    duration:6000,
                }
            );
          }
          navigate('/profile')
          setShowModal(false);
          setCustomerName("");
          setMobile("");
          setBookingSeats("");
        } catch (error) {
          console.error('Error creating booking:', error);
          if (error.data && error.message) {
            toast(
                message,{
                    duration:6000,
                }
            );
          } else {
            toast(
                message,{
                    duration:6000,
                }
            );
          }
        }
      };
      
      
    
    
    

    return (
        <>
            <TopBar />
            <div className="container view-tour">
                <div className="view-left-wrapper">
                    <img src={viewTour.image} alt={viewTour.title} className="tour-img" />
                </div>
                <div className="view-right-wrapper">
                    <div className="view-tour-head">
                        <div className="left-title">
                            <h1 className="tour-title">{viewTour.name || 'Title not available'}</h1>
                            <p className="tour-date">
                                <b>Location </b>: {viewTour.location}
                                <p style={{ marginTop: '10px' }}><b>Available Seats </b>: {viewTour.availableSeats}</p>
                            </p>
                        </div>
                    </div>
                    <p><b>Ratings </b>: {viewTour.rating || 'NA'}</p>
                    <p className='tour-price'><b>₹</b>{viewTour.price || 'NA'}</p>
                    <Button variant="primary" onClick={() => setShowModal(true)}>Book Now</Button> 
                </div>
            </div>

            <div className="view-body">
                <div className="container">
                <p className=''><b>Start Date </b>: {new Date(viewTour.startDate).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
<p className=''><b>End Date </b>: {viewTour.endDate}</p>

                    <p className=''><b>Program Details </b>: {viewTour.description}</p>
                </div>
            </div>

            {/* Booking Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Your Tour</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile" className="mt-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter your mobile number"
                            />
                        </Form.Group>

                        <Form.Group controlId="bookingSeats" className="mt-3">
                            <Form.Label>Number of Seats</Form.Label>
                            <Form.Control
                                type="number"
                                name="bookingSeats"
                                value={bookingSeats}
                                onChange={(e) => setBookingSeats(e.target.value)}
                                min="1"
                                max={viewTour.availableSeats} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleBookingSubmit}>
                        Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewTour;
