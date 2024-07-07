import React, { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState('');

  // Get all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOnsiaWQiOiI2Njg1YTQ2N2NhNTEzZTA4MGE2NjVhOTkifSwiaWF0IjoxNzIwMTE5MzQwfQ.uwPvcPRqxHSOyb0ChSl-6VrhuO1ekd757dRBRvWGaS8',
      },
    });
    const responseJSON = await response.json();
    setNotes(responseJSON);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOnsiaWQiOiI2Njg1YTQ2N2NhNTEzZTA4MGE2NjVhOTkifSwiaWF0IjoxNzIwMTE5MzQwfQ.uwPvcPRqxHSOyb0ChSl-6VrhuO1ekd757dRBRvWGaS8',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const addNoteJSON = await response.json();
    console.log(addNoteJSON);
    let newNote = addNoteJSON;
    setNotes(notes.concat(newNote));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOnsiaWQiOiI2Njg1YTQ2N2NhNTEzZTA4MGE2NjVhOTkifSwiaWF0IjoxNzIwMTE5MzQwfQ.uwPvcPRqxHSOyb0ChSl-6VrhuO1ekd757dRBRvWGaS8',
      },
    });
    const deleteNote = await response.json();
    console.log(`Deleting the Note with id : ${id}`);
    let newNotesAfterDeletion = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotesAfterDeletion);
    setAlert(deleteNote.Success);
  };

  // Edit a note
  const editNote = async (editTitle, editDescription, editTag, id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOnsiaWQiOiI2Njg1YTQ2N2NhNTEzZTA4MGE2NjVhOTkifSwiaWF0IjoxNzIwMTE5MzQwfQ.uwPvcPRqxHSOyb0ChSl-6VrhuO1ekd757dRBRvWGaS8',
      },
      body: JSON.stringify({ editTitle, editDescription, editTag }),
    });
    const editNoteResponse = await response.json();
    console.log(editNoteResponse);

    // Logic to update the values
  };

  return (
    <noteContext.Provider
      value={{ notes, getAllNotes, addNote, deleteNote, editNote, alert }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
