import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/alert/AlertContext';

const AddNote2 = (props) => {
  const { addNoteReference, addNoteReferenceClose } = props;
  const context = useContext(noteContext);
  const { addNote } = context;
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitleError('');
        setTitle(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'description':
        setDescriptionError('');
        setDescription(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'tag':
        setTag(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    if (title.length === 0) {
      setTitleError('Title cannot be empty');
      isValid = false;
    }

    if (description.length === 0) {
      setDescriptionError('Description cannot be empty');
      isValid = false;
    } else if (description.length < 5) {
      setDescriptionError('Description should be atleast 5 characters');
      isValid = false;
    }
    if (isValid) {
      addNote(title, description, tag);
      showAlert('Note has been added', 'success');
      setTitle('');
      setDescription('');
      setTag('');
      addNoteReferenceClose.current.click();
    }
  };

  return (
    <div className='container'>
      <button
        ref={addNoteReference} // Use ref here
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
      >
        Launch demo modal
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Add Note
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='title'
                    aria-describedby='emailHelp'
                    onChange={handleChange}
                    value={title}
                  />
                </div>
                <p style={{ color: '#bf2d31', fontWeight: '500' }}>
                  {titleError}
                </p>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <textarea
                    type='text'
                    className='form-control'
                    id='description'
                    name='description'
                    onChange={handleChange}
                    value={description}
                    rows='3'
                  />
                </div>
                <p style={{ color: '#bf2d31', fontWeight: '500' }}>
                  {descriptionError}
                </p>
                <div className='mb-3'>
                  <label htmlFor='tag' className='form-label'>
                    Tag
                    (Personal/Education/Entertainment/Movies/Music/Sports/...)
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='tag'
                    name='tag'
                    onChange={handleChange}
                    value={tag}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                ref={addNoteReferenceClose}
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleSubmit}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote2;
