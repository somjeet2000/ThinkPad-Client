import React, { useRef, useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddNote2 from './AddNote2';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();
  const [addNote, setAddNote] = useState(false);

  let ref = useRef(null);
  let refClose = useRef(null);
  let addNoteRef = useRef(null);
  let addNoteRefClose = useRef(null);

  const updateNote = (currentNote) => {
    setSelectedNote(currentNote);
    // Adding a small timeout to ensure the state is updated
    setTimeout(() => {
      ref.current.click();
    }, 0);
  };

  // To display the notes for the user.
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
      // eslint-disable-next-line
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, []);

  const handleClick = () => {
    setSelectedNote(null);
    setAddNote(true);
    setTimeout(() => {
      addNoteRef.current.click();
    }, 0);
  };

  return (
    <div className='container my-3'>
      <div className='row'>
        <div className='row'>
          <h2 className='col-11'>Your Notes</h2>
          <div className='col-1'>
            <button
              className='btn btn-outline-dark rounded-circle'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              data-bs-title='Add Note'
              onClick={handleClick}
            >
              <i className='fa-solid fa-plus'></i>
            </button>
          </div>
        </div>
        {/* <h2>Your Notes</h2> */}
        <div className='container mx-1'>
          {notes.length === 0 && 'No Notes to display.'}
        </div>
        {notes.map((notes) => {
          return (
            <NoteItem key={notes._id} notes={notes} updateNote={updateNote} />
          );
        })}
      </div>
      {/* You can't use ref={ref} here, you have to use reference or any other prop name. */}
      {selectedNote && (
        <EditNote
          reference={ref}
          referenceClose={refClose}
          selectedNote={selectedNote}
        />
      )}

      {addNote && (
        <AddNote2
          addNoteReference={addNoteRef}
          addNoteReferenceClose={addNoteRefClose}
        />
      )}
    </div>
  );
};

export default Notes;
