import React, { useContext } from 'react';
import Notes from './Notes';
import Alert from './Alert';
import AddNote from './AddNote';
import noteContext from '../context/notes/NoteContext';
import EditNote from './EditNote';

const Home = () => {
  const context = useContext(noteContext);
  const { alert } = context;
  return (
    <>
      <Alert message={alert} />
      <AddNote />
      <Notes />
    </>
  );
};

export default Home;
