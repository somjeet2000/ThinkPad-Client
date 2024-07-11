import React, { useContext } from 'react';
import Notes from './Notes';
import AddNote from './AddNote';
import Alert from './Alert';
import alertContext from '../context/alert/AlertContext';

const Home = (props) => {
  const context = useContext(alertContext);
  const { alert, showAlert } = context;
  return (
    <>
      <Alert alert={alert} />
      <AddNote showAlert={showAlert} />
      <Notes />
    </>
  );
};

export default Home;
