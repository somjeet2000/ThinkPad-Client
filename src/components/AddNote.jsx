import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    switch (name) {
      case 'title':
        setTitle(value);
        break;

      default:
        break;
    }
    switch (name) {
      case 'description':
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

  const handleClick = (event) => {
    event.preventDefault();
    console.log(title, description, tag);
    addNote(title, description, tag);
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
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
            onChange={handleChange}
            value={title}
          />
        </div>
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
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
