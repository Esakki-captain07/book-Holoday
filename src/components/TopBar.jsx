import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TopBar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const token = sessionStorage.getItem('token'); 
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleAdminOption = (option) => {
    navigate(`/admin/${option}`);
  };


  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="103.754" height="50" viewBox="0 0 103.754 50">
            <g id="holidify_logo" data-name="holidify logo" transform="translate(0 -0.934)">
              <path id="Path_1" data-name="Path 1" d="M57.929,40.213c-3.216,0-3.977-2.326-3.977-5.188,0-2.371,1.15-4.669,3.458-4.669h.865C62.964,30.356,63.331,40.213,57.929,40.213Zm10.726-19.3h4.353v3.908H68.651v-3.8h0v-.1ZM68.6,26.783h4.405V43.5H68.6ZM35.581,20.915h4.405V43.5H35.581Zm7.542,0h4.353v3.908H43.123Zm-.05,5.869h4.4V43.5h-4.4ZM12.1,3.38a3.348,3.348,0,0,0,1.007,2.97,3.216,3.216,0,0,0,2.278.834c0-1.692,1.249-2.594,2.94-2.594,0-2.477-2.244-4.652-4.907-3.177A2.5,2.5,0,0,0,12.1,3.38Zm5.706,4.842c0,4.183,11.493,6.439,14.651,6.007,1.991-.272,4.295-.452,5.235-1.857-.865-3.714-12.353-5.361-15.909-5.361a8.06,8.06,0,0,0-3.177.281c-.331.166-.8.612-.8.929ZM77.643,26.9H74.184l0,3.484s.932-.026,3.454-.026V43.5h4.323V30.356h4.323V26.9H81.966c0-2.464,2.527-2.492,4.323-2.075v-3.8c-2.672,0-5.108-.324-7.131,1.686A6.91,6.91,0,0,0,77.643,26.9Zm12.1,19.886v4.15c6.18,0,6.463-4.23,8.819-10.2L103.754,26.9H99.431c-.419,1.807-3.9,10.488-3.977,11.413a2.4,2.4,0,0,1-.668-1.234c-.685-1.9-3.041-9.02-3.655-10.179h-4.15a21.222,21.222,0,0,0,.938,2.693l5.2,13.836c.309.837.03,1.193-.715,2.557-.642,1.165-1.424.9-2.659.8Zm-68.3-11.413A5.812,5.812,0,0,1,22.3,31.9c1.513-2.2,6.928-2.123,6.928,2.775,0,2.626-.75,5.361-3.8,5.361C22.774,40.04,21.443,38.06,21.443,35.371Zm-4.5-1.038c0,2.935.119,5.054,2.46,7.4a8.76,8.76,0,0,0,11.852,0c3.953-3.953,3.255-11.817-1.971-14.376a9.91,9.91,0,0,0-7.673-.11,8.2,8.2,0,0,0-4.667,7.09ZM0,43.5H4.323c0-2.183-.216-9.21.463-10.95.912-2.345,4.783-2.477,5.886-.415.929,1.74.6,7.431.562,9.816-.032,1.935-.579,1.55,4.5,1.55,0-2.914.214-9.174-.354-11.75a6.1,6.1,0,0,0-1.2-2.6c-1.993-2.786-6.664-3.357-9.476-1.688-.484.285-.365.337-.9.48V5.628l.869,1.55A10.809,10.809,0,0,0,5.745,8.7a14.335,14.335,0,0,0,2.5,2.514c9.928,8.013,28.552,8.32,40.518,5.307a44.921,44.921,0,0,0,6.969-2.2,27.151,27.151,0,0,0,3.1-1.569c1.8-1.124,1.686-1.528,2.557-2.112L61.377,23.1c.11,1.254.011,3.007.011,4.314-1.777-.147-.482-.865-4.842-.865A7.429,7.429,0,0,0,51.5,28.945c-5.03,6.271-.679,17.647,8.424,14.651a10,10,0,0,0,1.98-.962V43.5h3.8V9.26c0-.839-1.258-.519-3.458-.519L51.112,10.224c-1.961.268-3.975.365-5.832.566l-6.026.372c.186.7.519.694.519,1.729,0,2.064-4.42,3.113-6.744,3.113H30.607c-5.767,0-12.569-2.389-14.876-5.7-.584-.841-.218-.949-1.332-1.262A23.04,23.04,0,0,1,8.743,6.915a10.508,10.508,0,0,1-3-2.192c-3.3-3.27,1-3.072-5.748-3.072V43.5Z" transform="translate(0 0)" fill="#ff443e"/>
            </g>
          </svg>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavbarOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-program">Create Program</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-bookings">All Bookings</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all-users">All Users</Link>
                </li>
              </>
            )}
            <li className="nav-item dropdown" style={{cursor:'pointer'}}>
              {token ? (
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    onClick={handleProfileClick}
                    aria-expanded={showProfileDropdown}
                  >
                    Profile
                  </a>
                  {showProfileDropdown && (
                     <ul className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                      <li><Link className="dropdown-item" to="/profile">View Profile</Link></li>
                      <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  )}
                </div>
              ) : (
                <a className="nav-link" onClick={handleLogin}>Login / Sign Up</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
