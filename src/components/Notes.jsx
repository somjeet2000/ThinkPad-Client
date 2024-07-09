import React, { useRef, useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import EditNote from './EditNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  const [selectedNote, setSelectedNote] = useState(null);

  let ref = useRef(null);
  let refClose = useRef(null);

  const updateNote = (currentNote) => {
    setSelectedNote(currentNote);
    // Adding a small timeout to ensure the state is updated
    setTimeout(() => {
      ref.current.click();
    }, 0);
  };

  // To display the notes for the user.
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="container my-3">
      <div className="row">
        <h2>Your Notes</h2>
        <div className="container mx-1">
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
    </div>
  );
};

export default Notes;
