import React from 'react';

const NoteItem = (props) => {
  const { notes } = props;
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
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
