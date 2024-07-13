import React, { useState, useContext } from 'react';
import authContext from '../context/authentication/AuthenticationContext';
import alertContext from '../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const context = useContext(authContext);
  const { registerUser } = context;
  const context2 = useContext(alertContext);
  const { alert, showAlert } = context2;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    switch (name) {
      case 'userName':
        setNameError('');
        setUserName(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'email':
        setEmailError('');
        setEmail(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'password':
        setPasswordError('');
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    if (userName.length === 0) {
      setNameError('Name cannot be empty');
    }
    if (email.length === 0) {
      setEmailError('Email cannot be empty');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a Valid Email');
      isValid = false;
    }
    if (password.length === 0) {
      setPasswordError('Password cannot be empty');
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError('Password must be atleast of 5 characters');
      isValid = false;
    }
    if (isValid) {
      registerUser(userName, email, password, navigate);
      showAlert('User created successfully', 'success');
    }
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="container my-3">
        <h2 className="text-center">
          Register Yourself to continue in ThinkPad
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              className="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
            />
          </div>
          <p style={{ color: '#bf2d31', fontWeight: '500' }}>{nameError}</p>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <p style={{ color: '#bf2d31', fontWeight: '500' }}>{emailError}</p>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <p style={{ color: '#bf2d31', fontWeight: '500' }}>{passwordError}</p>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
