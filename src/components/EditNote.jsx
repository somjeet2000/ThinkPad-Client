import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const EditNote = (props) => {
  const { reference, referenceClose, selectedNote } = props;
  console.log(selectedNote);

  const { eTitle, eDescription, eTag } = selectedNote;
  console.log(eTitle, eDescription, eTag);

  const handleClick = (event) => {
    event.preventDefault();
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
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    name="editTitle"
                    aria-describedby="emailHelp"
                    // onChange={handleChange}
                    // value={selectedNote.eTitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editDescription"
                    name="editDescription"
                    // onChange={handleChange}
                    // value={selectedNote.eDescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTag"
                    name="editTag"
                    // onChange={handleChange}
                    // value={selectedNote.eTag}
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
