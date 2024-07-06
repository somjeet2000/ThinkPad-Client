import React, { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: '668702b08c3fb7175f1232e1',
      user: '6685a467ca513e080a665a99',
      title: 'My Title',
      description: 'Wake Up at 6 AM',
      tag: 'Personal',
      date: '2024-07-04T20:14:40.202Z',
      __v: 0,
    },
    {
      _id: '668702b18c3fb7175f1232e2',
      user: '6685a467ca513e080a665a99',
      title: 'My Title',
      description: 'Wake Up at 6 AM',
      tag: 'Personal',
      date: '2024-07-04T20:14:41.558Z',
      __v: 0,
    },
    {
      _id: '668702b38c3fb7175f1232e3',
      user: '6685a467ca513e080a665a99',
      title: 'My Title',
      description: 'Wake Up at 6 AM',
      tag: 'Personal',
      date: '2024-07-04T20:14:43.078Z',
      __v: 0,
    },
    {
      _id: '668702b18c3fb7175f1232e4',
      user: '6685a467ca513e080a665a99',
      title: 'My Title',
      description: 'Wake Up at 6 AM',
      tag: 'Personal',
      date: '2024-07-04T20:14:41.558Z',
      __v: 0,
    },
    {
      _id: '668702b38c3fb7175f1232e5',
      user: '6685a467ca513e080a665a99',
      title: 'My Title',
      description: 'Wake Up at 6 AM',
      tag: 'Personal',
      date: '2024-07-04T20:14:43.078Z',
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = (title, description, tag) => {
    let newNote = {
      _id: '668702b38c3fb7175f1232e6',
      user: '6685a467ca513e080a665a99',
      title: title,
      description: description,
      tag: tag,
      date: '2024-07-04T20:14:43.078Z',
      __v: 0,
    };
    setNotes(notes.concat(newNote));
  };

  return (
    <noteContext.Provider value={{ notes, addNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
