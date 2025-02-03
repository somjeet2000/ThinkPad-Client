import { useContext, useState } from 'react';
import authContext from './AuthenticationContext';
import alertContext from '../alert/AlertContext';

function AuthenticationState(props) {
  const host = process.env.REACT_APP_THINKPAD_SERVER;
  const context = useContext(alertContext);
  const { showAlert } = context;
  const [loggedinUserName, setLoggedinUserName] = useState('');

  // Register User
  const registerUser = async (
    userName,
    email,
    password,
    securityQuestion,
    securityAnswer,
    navigate
  ) => {
    window.scrollTo(0, 0);
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        email,
        password,
        securityQuestion,
        securityAnswer,
      }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      // Redirect to Home
      localStorage.setItem('token', responseJSON.authToken);
      localStorage.setItem('tokenSetTime', Date.now().toString());
      showAlert('Please wait! Redirecting to home...', 'info');
      navigate('/');
      return true;
    } else {
      // alert(responseJSON.error);
      showAlert(
        'User with this email already exists. Please enter an unique email.',
        'danger'
      );
      return false;
    }
  };

  // Login User
  const loginUser = async (email, password, navigate) => {
    window.scrollTo(0, 0);
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      // Redirect to Home
      localStorage.setItem('token', responseJSON.authToken);
      localStorage.setItem('tokenSetTime', Date.now().toString());
      showAlert('Credentials Verified! Redirecting to home...', 'info');
      navigate('/');
      return true;
    } else {
      // alert(responseJSON.error);
      showAlert('Please try to login with the correct credentials', 'danger');
      return false;
    }
  };

  // Get User Data
  const getUserData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const responseJSON = await response.json();
    setLoggedinUserName(responseJSON.name);
  };

  return (
    <authContext.Provider
      value={{ loginUser, registerUser, getUserData, loggedinUserName }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export default AuthenticationState;
