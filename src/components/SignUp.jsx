import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import AxiosService from './utils/AxiosService';
import ApiRoutes from './utils/ApiRoutes';
import toast from 'react-hot-toast';

function Login({ onClose, showLoginForm }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createUserPromise = AxiosService.post(
      ApiRoutes.CREATE_USER.path, 
      { firstName, lastName, email, password },
      { authenticate: ApiRoutes.CREATE_USER }
    );

    toast.promise(
      createUserPromise,  
      {
        loading: 'Saving...',
        success: 'Account Created Successfully!', 
        error: 'Failed to create account. Please check your details.', 
      }
    );

    try {
      const { data } = await createUserPromise;
      navigate('/');
      onClose(); 
    } catch (error) {
      console.error('Account creation error:', error);
    }
  };

  return (
    <div className="compose-overlay">
      <div className="compose-email">
        <div className="compose-top">
          <button className="compose-close" onClick={onClose}>×</button>
          <h4 className="login-account">Create Your Account</h4>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="container">
              <h5 className="login-label">Welcome to Holidify</h5>
              <div className="compose-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="compose-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="compose-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="compose-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="compose-buttons">
              <button className="login-btn" type="submit">Create</button>
            </div>
            <div style={{ marginTop: '5px', marginLeft: '55px' }}>
              <Link className="small" to={'/login'} type="button" >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
