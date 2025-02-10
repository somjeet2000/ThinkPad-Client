import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/AlertContext';

const Profile = () => {
  const host = process.env.REACT_APP_THINKPAD_SERVER;
  const navigate = useNavigate();
  const alertCtx = useContext(alertContext);
  const { showAlert } = alertCtx;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setEmail(data.email);
        } else {
          showAlert('User Not Found', 'danger');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user: ', error);
      }
    };

    fetchuser();
  }, [navigate, showAlert]);

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/deleteuser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        localStorage.removeItem('token');
        showAlert('Account deleted successfully', 'success');
        navigate('/login');
      } else {
        showAlert('Failed to delete account', 'danger');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showAlert('An error occurred', 'danger');
    }
  };

  return (
    <div className='container mt-5'>
      <div
        className='card p-4 shadow-sm'
        style={{ maxWidth: '400px', margin: 'auto' }}
      >
        <h3 className='text-center mb-4'>My Account</h3>
        <form>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input type='text' className='form-control' value={name} disabled />
          </div>
          <div className='mb-4'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              value={email}
              disabled
            />
          </div>
          <button
            className='btn btn-danger w-100'
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
