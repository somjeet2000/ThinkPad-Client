import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/alert/AlertContext';

const NoteItem = (props) => {
  const { notes, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClickDelete = (event) => {
    event.preventDefault();
    setShowPrompt(true);
  };

  const handleConfirm = () => {
    deleteNote(notes._id);
    setShowPrompt(false);
    showAlert('Note has been deleted', 'success');
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  return (
    <div className="col-md-6">
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
          {showPrompt && (
            <div className="prompt my-2">
              <p>Are you sure want to delete the note ?</p>
              <button
                className="btn btn-success me-md-2"
                onClick={handleCancel}
              >
                No
              </button>
              <button className="btn btn-danger" onClick={handleConfirm}>
                Yes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
