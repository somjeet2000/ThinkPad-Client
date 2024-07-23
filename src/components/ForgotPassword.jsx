import React, { useContext, useState } from 'react';
import Alert from './Alert';
import alertContext from '../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState(
    "What is your mother's maiden name?"
  );
  //   const [securityQuestionError, setSecurityQuestionError] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityAnswerError, setSecurityAnswerError] = useState('');
  const host = 'http://localhost:5000';
  const [showResetForm, setShowResetForm] = useState(false);
  const context = useContext(alertContext);
  const { alert, showAlert } = context;
  const [disabled, setDisabled] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmailError('');
        setEmail(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'securityQuestion':
        // setSecurityQuestionError('');
        setSecurityQuestion(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'securityAnswer':
        setSecurityAnswerError('');
        setSecurityAnswer(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'password':
        setNewPasswordError('');
        setNewPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      setEmailError('Email cannot be empty');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a Valid Email');
      isValid = false;
    }
    // if (securityQuestion.length === 0) {
    //   setSecurityQuestionError('You need to select atleast one question');
    //   isValid = false;
    // }
    if (securityAnswer.length === 0) {
      setSecurityAnswerError('Answer should not be blank');
      isValid = false;
    }
    if (isValid) {
      const response = await fetch(
        `${host}/api/forgotpassword/forgotpassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            securityQuestion,
            securityAnswer,
          }),
        }
      );
      showAlert('Please Wait! Verifying your answer...', 'info');
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.isValid) {
        localStorage.setItem(
          'verification-token',
          responseJSON.verificationToken
        );
        showAlert(
          'Verification successful! Please proceed to change the password.',
          'success'
        );
        setShowResetForm(true);
        setDisabled(true);
      } else {
        showAlert(
          'Please enter the correct data to reset your password.',
          'danger'
        );
      }
    }
  };

  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    if (newPassword.length === 0) {
      setNewPasswordError('Password cannot be empty');
      isValid = false;
    } else if (newPassword.length < 5) {
      setNewPasswordError('Password must be atleast of 5 characters');
      isValid = false;
    }
    // If isValid is true,
    if (isValid) {
      const response = await fetch(`${host}/api/forgotpassword/resetpassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'verification-token': localStorage.getItem('verification-token'),
        },
        body: JSON.stringify({ newPassword }),
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.isSuccess) {
        showAlert(
          'Password Reset Successfully! Please login to continue.',
          'success'
        );
        navigate('/login');
        localStorage.removeItem('verification-token');
      } else {
        showAlert('Error while resetting the password.', 'danger');
      }
    }
  };
  return (
    <>
      <Alert alert={alert} />
      <div className='container my-3'>
        <h3 className='text-center my-3'>Reset Your Password here 🤞</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-2 row'>
            <label htmlFor='email' className='col-sm-2 col-form-label'>
              Email
            </label>
            <div className='col-sm-10'>
              <input
                type='email'
                name='email'
                className='form-control'
                id='email'
                value={email}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-2'></div>
            <p
              className='col-sm-10 my-2'
              style={{ color: '#bf2d31', fontWeight: '500' }}
            >
              {emailError}
            </p>
          </div>
          <div className='mb-4 row'>
            <label className='col-sm-2 col-form-label'>
              Select your question
            </label>
            <div className='col-sm-10'>
              <select
                className='form-select'
                name='securityQuestion'
                value={securityQuestion}
                onChange={handleChange}
                disabled={disabled}
              >
                <option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </option>
                <option value='What was the name of your first pet?'>
                  What was the name of your first pet?
                </option>
                <option value='What was the name of your elementary school?'>
                  What was the name of your elementary school?
                </option>
                <option value='What is the name of the town where you were born?'>
                  What is the name of the town where you were born?
                </option>
                <option value='What was your childhood nickname?'>
                  What was your childhood nickname?
                </option>
              </select>
            </div>
          </div>
          <div className='mb-2 row'>
            <label
              htmlFor='exampleInputSecurityAnswer'
              className='col-sm-2 col-form-label'
            >
              Your Answer
            </label>
            <div className='col-sm-10'>
              <input
                type='password'
                name='securityAnswer'
                className='form-control'
                id='exampleInputSecurityAnswer'
                value={securityAnswer}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-2'></div>
            <p
              className='col-sm-10 my-2'
              style={{ color: '#bf2d31', fontWeight: '500' }}
            >
              {securityAnswerError}
            </p>
          </div>
          <div className='row'>
            <div className='col-sm-2'></div>
            <div className='col-sm-10'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={disabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        {showResetForm && (
          <div className='my-3'>
            <h4 className='text-center'>Enter the New Password 👇</h4>
            <form onSubmit={handlePasswordChangeSubmit}>
              <div className='row'>
                <label
                  htmlFor='inputPassword'
                  className='col-sm-2 col-form-label'
                >
                  Password
                </label>
                <div className='col-sm-10'>
                  <input
                    type='password'
                    className='form-control'
                    id='inputPassword'
                    name='password'
                    value={newPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'></div>
                <p
                  className='col-sm-10 my-2'
                  style={{ color: '#bf2d31', fontWeight: '500' }}
                >
                  {newPasswordError}
                </p>
              </div>
              <div className='row'>
                <div className='col-sm-2'></div>
                <div className='col-sm-10'>
                  <button type='submit' className='btn btn-primary'>
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
