import React, { useRef, useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import EditNote from './EditNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  let ref = useRef(null);
  let refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    console.log(currentNote);
  };

  // To display the notes for the user.
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="container my-3">
      <div className="row">
        {/* You can't use ref={ref} here, you have to use reference or any other prop name. */}
        <h2>Your Notes</h2>
        {notes.map((notes) => {
          return (
            <div key={notes._id}>
              <NoteItem notes={notes} updateNote={updateNote} />
              <EditNote
                reference={ref}
                referenceClose={refClose}
                currNote={notes}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
