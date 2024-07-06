import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <div className="container my-3">
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} notes={notes} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
