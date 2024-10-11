import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import { Calendar } from 'primereact/calendar';
import TopBar from '../TopBar';
import ClipLoader from "react-spinners/ClockLoader"; 
import toast from 'react-hot-toast';
function CreateProgram() {
  const [upComming, setupComming] = useState('Yes');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [rating, setRating] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [availableSeats, setAvailableSeats] = useState("");
  let [country, setCountry] = useState("");
  let [location, setLocation] = useState("");
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");

  const [beach, setBeach] = useState(false);
  const [hills, setHills] = useState(false);
  const [adventure, setAdventure] = useState(false);
  const [religious, setReligious] = useState(false);
  const [heritage, setHeritage] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  
    try {
      const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString("en-GB") : '';
      const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString("en-GB") : '';

      let { message } = await AxiosService.post(ApiRoutes.CREATE_PROGRAM.path, {
        name,
        price,
        rating,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        availableSeats,
        country,
        location,
        image,
        description,
        upComming: upComming === 'Yes',
        beach,
        hills,
        adventure,
        religious,
        heritage
      }, { authenticate: ApiRoutes.CREATE_PROGRAM.auth });

      toast(message, { duration: 6000 });
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
      toast("An error occurred during submission", { duration: 6000 });
    } finally {
      setLoading(false);  
    }
  };

  return <>
    <TopBar />
    <div className='container'>
      <h1>Create Program</h1>

      {loading ? (
        <div className="loader-overlay">
          <ClipLoader color={"#36d7b7"} loading={loading} size={70} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) :<Form noValidate className='container' onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Place Name</Form.Label>
              <Form.Control required type="text" placeholder="Place Name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Price</Form.Label>
              <Form.Control required type="Number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Rating</Form.Label>
              <InputGroup hasValidation>
                <Form.Control type="number" placeholder="Rating" required onChange={(e) => setRating(e.target.value)} />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Start Date</Form.Label>
              <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} style={{ width: '100%' }} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>End Date</Form.Label>
              <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} style={{ width: '100%' }} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Available Seats</Form.Label>
              <Form.Control type="text" placeholder="Available Seats" required onChange={(e) => setAvailableSeats(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Country" required onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Location" required onChange={(e) => setLocation(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>upComing</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  id="upComming-yes"
                  name="upComming"
                  value="Yes"
                  checked={upComming === 'Yes'? true:false}
                  onChange={(e) => setupComming(e.target.value)}
                />
                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  id="upComming-no"
                  name="upComming"
                  value="No"
                  checked={upComming === 'No'}
                  onChange={(e) => setupComming(e.target.value)}
                />
              </div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Options</Form.Label>
              <div>
                <Form.Check 
                  type="checkbox" 
                  label="Beach" 
                  id="option1" 
                  checked={beach}
                  onChange={(e) => setBeach(e.target.checked)} 
                />
                <Form.Check 
                  type="checkbox" 
                  label="Hills" 
                  id="option2" 
                  checked={hills}
                  onChange={(e) => setHills(e.target.checked)} 
                />
                <Form.Check 
                  type="checkbox" 
                  label="Adventure" 
                  id="option3" 
                  checked={adventure}
                  onChange={(e) => setAdventure(e.target.checked)} 
                />
                <Form.Check 
                  type="checkbox" 
                  label="Religious" 
                  id="option4" 
                  checked={religious}
                  onChange={(e) => setReligious(e.target.checked)} 
                />
                <Form.Check 
                  type="checkbox" 
                  label="Heritage" 
                  id="option5" 
                  checked={heritage}
                  onChange={(e) => setHeritage(e.target.checked)} 
                />
              </div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Image URL" required onChange={(e) => setImage(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' placeholder="Write your thoughts!" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      }
    </div>
  </>;
}

export default CreateProgram;
