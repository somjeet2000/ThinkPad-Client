import { useContext } from 'react';
import authContext from './AuthenticationContext';
import alertContext from '../alert/AlertContext';

function AuthenticationState(props) {
  const host = 'http://localhost:5000';
  const context = useContext(alertContext);
  const { showAlert } = context;

  // Register User
  const registerUser = async (userName, email, password, navigate) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName, email, password }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      // Redirect to Home
      localStorage.setItem('token', responseJSON.authToken);
      navigate('/');
    } else {
      // alert(responseJSON.error);
      showAlert(
        'User with this email already exists. Please enter an unique email.',
        'danger'
      );
    }
  };

  // Login User
  const loginUser = async (email, password, navigate) => {
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
      navigate('/');
    } else {
      // alert(responseJSON.error);
      showAlert('Please try to login with the correct credentials', 'danger');
    }
  };

  return (
    <authContext.Provider value={{ loginUser, registerUser }}>
      {props.children}
    </authContext.Provider>
  );
}

export default AuthenticationState;
