import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/authentication/AuthenticationContext';
import alertContext from '../context/alert/AlertContext';
import Logo from './Logo.png';

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const host = process.env.REACT_APP_THINKPAD_SERVER;
  const context = useContext(authContext);
  const { loggedinUserName } = context;
  const alertcontext = useContext(alertContext);
  const { showAlert } = alertcontext;
  const [name, setName] = useState(loggedinUserName);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setName('');
    navigate('/login');
    showAlert('User Logged Out Successfully', 'success');
  };

  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const responseJSON = await response.json();
    // loggedinUserName = responseJSON.name;
    setName(responseJSON.name);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData();
    }
  }, [loggedinUserName, getUserData]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              className="img-fluid rounded mx-2"
              style={{ height: '2.5rem', width: '6rem' }}
              alt="ThinkPad"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <div className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <button disabled className="btn btn-dark mx-2">
                  Hello, {loggedinUserName || name}
                  <i
                    className="fa-solid fa-user mx-1"
                    style={{ paddingLeft: '0.25rem' }}
                  ></i>
                </button>
                <button className="btn btn-primary mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
