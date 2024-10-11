import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Header from './Header';
import ContantBody from './ContantBody';
import Login from './Login';
import SignUp from './SignUp';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const showLoginForm = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const showSignUpForm = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  return (
    <>
      <TopBar setShowLogin={showLoginForm} />
      <Header />
      <ContantBody />
      {showLogin && <Login onClose={handleClose} showLoginForm={showLoginForm} />}
      {showSignUp && <SignUp onClose={handleClose} showSignUpForm={showSignUpForm} />}
    </>
  );
}

export default Home;
