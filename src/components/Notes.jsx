import React, { useRef, useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddNote2 from './AddNote2';

const Notes = ({ searchTag }) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, searchNote } = context;
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
    const token = localStorage.getItem('token');
    const tokenSetTime = localStorage.getItem('tokenSetTime');
    if (token && tokenSetTime) {
      const currentTime = Date.now();
      const tokenAge = currentTime - parseInt(tokenSetTime, 10);
      if (tokenAge > 3600000) {
        // 1 hour = 3600000 ms
        localStorage.removeItem('token');
        localStorage.removeItem('tokenSetTime');
        navigate('/login');
      } else {
        if (searchTag.length === 0) {
          getAllNotes();
        } else {
          searchNote(searchTag);
        }
      }
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTag, searchNote]);

  // Reset token timestamp on user activity
  useEffect(() => {
    const resetTimer = () => {
      localStorage.setItem('tokenSetTime', Date.now().toString());
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
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

        {notes.length === 0 ? (
          <p className='text-muted'>No Notes to display.</p>
        ) : (
          notes.map((note) => {
            return (
              <NoteItem key={note._id} notes={note} updateNote={updateNote} />
            );
          })
        )}
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
