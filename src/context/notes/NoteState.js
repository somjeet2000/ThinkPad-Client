import React, { useState, useCallback } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
  const host = process.env.REACT_APP_THINKPAD_SERVER;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getAllNotes = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const responseData = await response.json();
      setNotes(responseData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, []);

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const addNoteJSON = await response.json();
    let newNote = addNoteJSON;
    setNotes(notes.concat(newNote));
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const deleteNote = await response.json();
    console.log(deleteNote);
    console.log(`Deleting the Note with id : ${id}`);
    let newNotesAfterDeletion = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotesAfterDeletion);
  };

  // Update a note
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const editNoteResponse = await response.json();
    console.log(editNoteResponse);
    // Logic to update the values in Client side
    /*
    We can't set the state variable directly like this way. Instead we have to create a new variable and when the state variable has been updated, the new variable will also updated automatically.
    */
    let updatedNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < updatedNotes.length; i++) {
      const element = updatedNotes[i];
      if (element._id === id) {
        updatedNotes[i].title = title;
        updatedNotes[i].description = description;
        updatedNotes[i].tag = tag;
        break;
      }
    }
    setNotes(updatedNotes);
  };

  // Search notes based on the tag
  const searchNote = async (query) => {
    const response = await fetch(`${host}/api/notes/search?tag=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No notes found`);
    }
    const responseData = await response.json();
    console.log(responseData);
    setNotes(responseData.length > 0 ? responseData : []);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        getAllNotes,
        addNote,
        deleteNote,
        updateNote,
        searchNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
