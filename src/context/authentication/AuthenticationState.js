import authContext from './AuthenticationContext';

function AuthenticationState(props) {
  const host = 'http://localhost:5000';

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
      alert(responseJSON.error);
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
      alert(responseJSON.error);
    }
  };

  return (
    <authContext.Provider value={{ loginUser, registerUser }}>
      {props.children}
    </authContext.Provider>
  );
}

export default AuthenticationState;
