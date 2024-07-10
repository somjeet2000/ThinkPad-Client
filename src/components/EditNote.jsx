import React, { useState, useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';

const EditNote = (props) => {
  const { reference, referenceClose, selectedNote } = props;
  const [editNote, setEditNote] = useState(selectedNote);
  const context = useContext(noteContext);
  const { updateNote } = context;
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  /* 
  The useEffect hook ensures that whenever the selectedNote prop changes, the local state editNote is updated accordingly.
  */
  useEffect(() => {
    setEditNote(selectedNote);
  }, [selectedNote]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setTitleError('');
    setDescriptionError('');
    setEditNote({ ...editNote, [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Validation in the client for title and description
    let isValid = true;
    if (editNote.title.length === 0) {
      setTitleError('Title cannot be empty');
      isValid = false;
    }
    if (editNote.description.length === 0) {
      setDescriptionError('Description cannot be empty');
      isValid = false;
    } else if (editNote.description.length < 5) {
      setDescriptionError('Description should be atleast 5 characters');
      isValid = false;
    }
    if (isValid) {
      console.log('Updating the note...', editNote);
      updateNote(
        editNote._id,
        editNote.title,
        editNote.description,
        editNote.tag
      );
      referenceClose.current.click();
    }
  };

  const handleClick1 = () => {
    setTitleError('');
    setDescriptionError('');
    setEditNote(selectedNote);
  };

  return (
    <div className="container">
      <button
        ref={reference}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClick1}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    value={editNote.title}
                    onChange={handleChange}
                  />
                </div>
                <p style={{ color: '#bf2d31', fontWeight: '500' }}>
                  {titleError}
                </p>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={editNote.description}
                    onChange={handleChange}
                  />
                </div>
                <p style={{ color: '#bf2d31', fontWeight: '500' }}>
                  {descriptionError}
                </p>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={editNote.tag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={referenceClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClick1}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
