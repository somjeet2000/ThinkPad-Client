import React, { useState, useContext } from 'react';
import alertContext from '../context/alert/AlertContext';
import Alert from './Alert';

const About = () => {
  const [useFrequency, setUseFrequency] = useState('');
  const [feedback, setFeedback] = useState('');
  const context = useContext(alertContext);
  const { alert, showAlert } = context;
  const host = process.env.REACT_APP_THINKPAD_SERVER

  const handleSubmit = (event) => {
    event.preventDefault();
    // Scroll the window to the top
    window.scrollTo(0, 0);
    showAlert('Please wait! We are submitting your feedback...', 'info');

    fetch(`${host}/api/feedback/submitFeedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ useFrequency, feedback }),
    })
      .then((response) => response.text())
      .then((data) => {
        // Clear input fields
        setUseFrequency('');
        setFeedback('');
        showAlert(data, 'success');
      })
      .catch((error) => {
        showAlert(error, 'danger');
      });
  };

  return (
    <>
      <Alert alert={alert} />
      <div className='container my-3'>
        <h2 className='text-center my-3'>About ThinkPad</h2>
        <div className='accordion' id='accordionPanelsStayOpenExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header'>
              <button
                className='accordion-button'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#panelsStayOpen-collapseOne'
                aria-expanded='true'
                aria-controls='panelsStayOpen-collapseOne'
              >
                Simplicity at Its Core
              </button>
            </h2>
            <div
              id='panelsStayOpen-collapseOne'
              className='accordion-collapse collapse show'
            >
              <div className='accordion-body'>
                <strong>
                  Our ThinkPad app is designed with simplicity as its
                  foundation,
                </strong>{' '}
                ensuring an effortless experience for jotting down your
                thoughts, ideas, and to-do lists. Whether you're a student
                capturing lecture notes, a professional organizing work tasks,
                or a creative thinker brainstorming new concepts, our intuitive
                interface allows you to focus on what truly matters — your
                content. With minimal distractions and a clean design, our app
                helps you quickly and easily record your ideas, making
                note-taking a seamless and enjoyable process.
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <h2 className='accordion-header'>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#panelsStayOpen-collapseTwo'
                aria-expanded='false'
                aria-controls='panelsStayOpen-collapseTwo'
              >
                Organize Your Life
              </button>
            </h2>
            <div
              id='panelsStayOpen-collapseTwo'
              className='accordion-collapse collapse'
            >
              <div className='accordion-body'>
                <strong>
                  Stay organized with ease using our ThinkPad app.
                </strong>{' '}
                You can categorize your notes into different notebooks, assign
                tags for quick searching, and easily retrieve important
                information when you need it. Our app empowers you to structure
                your digital workspace in a way that suits your preferences.
                Whether you're managing personal projects, work assignments, or
                creative ideas, our organizational tools ensure that you can
                find what you need, when you need it. Say goodbye to clutter and
                confusion, and hello to a more organized and efficient way of
                managing your notes.
              </div>
            </div>
          </div>
          <div className='accordion-item'>
            <h2 className='accordion-header'>
              <button
                className='accordion-button collapsed'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#panelsStayOpen-collapseThree'
                aria-expanded='false'
                aria-controls='panelsStayOpen-collapseThree'
              >
                Sync Across Devices
              </button>
            </h2>
            <div
              id='panelsStayOpen-collapseThree'
              className='accordion-collapse collapse'
            >
              <div className='accordion-body'>
                <strong>
                  Access your notes anytime, anywhere with our seamless
                  synchronization feature.
                </strong>{' '}
                Our ThinkPad app ensures that your notes are automatically
                synced across all your devices, including smartphones, tablets,
                and computers. This means you can start a note on one device and
                continue it on another without any hassle. Whether you're at
                home, in the office, or on the go, your notes are always up to
                date and readily available. Effortlessly switch between devices
                and maintain your productivity without missing a beat, ensuring
                that your ideas are always at your fingertips.
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h2 className='my-4 text-center underline'>
            👋 Help us improve ThinkPad
          </h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='exampleInputUse' className='form-label'>
                How often do you use our app ?
              </label>
              <input
                type='text'
                className='form-control'
                id='exampleInputUse'
                placeholder='Everyday/Once-a-week/Bi-weekly'
                value={useFrequency}
                onChange={(e) => setUseFrequency(e.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleFeedback' className='form-label'>
                What would you like to see improved the most ?
              </label>
              <textarea
                type='text'
                className='form-control'
                id='exampleFeedback'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
