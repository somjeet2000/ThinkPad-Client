import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import authContext from '../context/authentication/AuthenticationContext';
import alertContext from '../context/alert/AlertContext';
import Logo from './Logo.png';

const Navbar = ({ setSearchTag }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const host = process.env.REACT_APP_THINKPAD_SERVER;
  const context = useContext(authContext);
  const { loggedinUserName } = context;
  const alertcontext = useContext(alertContext);
  const { showAlert } = alertcontext;
  const [name, setName] = useState(loggedinUserName);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Ref for dropdown
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setName('');
    navigate('/login');
    showAlert('User Logged Out Successfully', 'success');
    setIsOpen(false);
    setSearchTerm('');
    setSearchTag('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (response.status === 401) {
      // User deleted, Handle Logout
      localStorage.removeItem('token');
      setName('');
      navigate('/login');
      showAlert(
        'Your account no longer exists. Please log in again.',
        'danger'
      );
    }
    const responseJSON = await response.json();
    // loggedinUserName = responseJSON.name;
    setName(responseJSON.name);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData();
    }
  }, [loggedinUserName, getUserData]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === '') {
      setSearchTag(''); //Reset search when input is cleared
    } else {
      setSearchTag(value);
    }
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img
              src={Logo}
              className='img-fluid rounded mx-2'
              style={{ height: '2.5rem', width: '6rem' }}
              alt='ThinkPad'
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current='page'
                  to='/'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to='/about'
                >
                  About
                </Link>
              </li>
            </ul>
            {/* {!localStorage.getItem('token') ? (
              <div className='d-flex'>
                <Link
                  className='btn btn-primary mx-2'
                  to='/login'
                  role='button'
                >
                  Login
                </Link>
                <Link
                  className='btn btn-primary mx-2'
                  to='/signup'
                  role='button'
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <button
                  className='btn btn-light mx-2'
                  style={{ display: 'flex' }}
                  onClick={handleClick}
                >
                  Hi, {loggedinUserName || name}
                  <div style={{ transition: 'transform 0.3s ease-in-out' }}>
                    <i
                      className='fa-solid fa-angle-down p-1'
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    ></i>
                  </div>
                </button>
                <button className='btn btn-primary mx-2' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )} */}
            {!localStorage.getItem('token') ? (
              <div className='d-flex'>
                <Link
                  className='btn btn-success mx-2'
                  to='/login'
                  role='button'
                >
                  Login
                </Link>
                <Link
                  className='btn btn-primary mx-2'
                  to='/signup'
                  role='button'
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div
                ref={dropdownRef}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  type='text'
                  className='form-control mx-3'
                  placeholder='Search notes by tag...'
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ width: '200px' }}
                />

                {/* Profile Button */}
                <button
                  className='btn btn-light mx-2'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                  }}
                  onClick={handleClick}
                >
                  Hi, {loggedinUserName || name}
                  <i
                    className='fa-solid fa-angle-down'
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  ></i>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    className='dropdown-menu show'
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      minWidth: '150px',
                      zIndex: 1000,
                    }}
                  >
                    <Link
                      to='/profile'
                      className='dropdown-item'
                      style={{
                        display: 'block',
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: '#333',
                      }}
                      onClick={() => {
                        setIsOpen(false);
                      }} // Close dropdown on profile click
                    >
                      <i className='fa-solid fa-user mx-1'></i> Profile
                    </Link>
                    <button
                      className='dropdown-item'
                      style={{
                        display: 'block',
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: 'red',
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                      }}
                      onClick={handleLogout}
                    >
                      <i className='fa-solid fa-sign-out mx-1'></i> Logout
                    </button>
                  </div>
                )}
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
