import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosService from './utils/AxiosService';
import ApiRoutes from './utils/ApiRoutes';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/MoonLoader"; 

function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let { message, token, role } = await AxiosService.post(ApiRoutes.LOGIN.path, { email, password }, { authenticate: ApiRoutes.auth });

      sessionStorage.setItem('token', token);
      localStorage.setItem('token',token)

      const isAdmin = role === 'admin'; 

      if (isAdmin) {
        sessionStorage.setItem('isAdmin', true); 
        localStorage.setItem('token',token)
      } else {
        sessionStorage.setItem('isAdmin', false);
        localStorage.setItem('token',token)
      }


      if (isAdmin) {
        navigate('/');
      } else {
        navigate('/');
      }

      onClose(); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="compose-overlay">
      {loading ?(
      <div className='loader-overlay'>
      <ClipLoader color={"#36d7b7"} loading={loading} size={70}aria-label="Loading Spinner" data-testid="loader"/>
      </div>
    ):
      <div className="compose-email">
        <div className="compose-top">
          <button className="compose-close" onClick={onClose}>×</button>
          <h4 className="login-account">Login Your Account</h4>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="container">
              <h5 className="login-label">Welcome to Holidify</h5>
              <div className="compose-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="compose-field">
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="compose-buttons">
              <button className="login-btn" type="submit">Continue</button>
            </div>
          <div style={{marginTop:'50px',marginLeft:'20px'}}>
              <Link className="small" to="/signup">If Dont You Have An Account Please Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
}
    </div>
  );
}

export default Login;
