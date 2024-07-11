import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/alert/AlertContext';

const NoteItem = (props) => {
  const { notes, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const context2 = useContext(alertContext);
  const { showAlert } = context2;

  const handleClickDelete = (event) => {
    event.preventDefault();
    deleteNote(notes._id);
    showAlert('Note has been deleted', 'success');
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <p className="btn btn-secondary">{notes.tag}</p>
          <div>
            <i
              className="fa-solid fa-trash mx-2"
              style={{ cursor: 'pointer' }}
              onClick={handleClickDelete}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                updateNote(notes);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
