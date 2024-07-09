import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

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
      setTitle('');
      setDescription('');
      setTag('');
    }
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={title}
          />
        </div>
        <p style={{ color: '#bf2d31', fontWeight: '500' }}>{titleError}</p>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            value={description}
          />
        </div>
        <p style={{ color: '#bf2d31', fontWeight: '500' }}>
          {descriptionError}
        </p>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag (Personal/Education/Entertainment/Movies/Music/Sports/...)
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            value={tag}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
