import React, { useRef, useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import EditNote from './EditNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  const [selectedNote, setSelectedNote] = useState({
    eTitle: '',
    eDescription: '',
    eTag: '',
  });

  let ref = useRef(null);
  let refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    console.log(currentNote);
    setSelectedNote({
      eTitle: currentNote.title,
      eDescription: currentNote.description,
      eTag: currentNote.tag,
    });
  };

  // To display the notes for the user.
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="container my-3">
      <div className="row">
        {/* You can't use ref={ref} here, you have to use reference or any other prop name. */}
        <EditNote
          reference={ref}
          referenceClose={refClose}
          selectedNote={selectedNote}
          onChange={(e) => setSelectedNote(e.target.value)}
        />
        <h2>Your Notes</h2>
        {notes.map((notes) => {
          return (
            <NoteItem key={notes._id} notes={notes} updateNote={updateNote} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
