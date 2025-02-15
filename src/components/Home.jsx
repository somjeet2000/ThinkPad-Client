import React, { useContext } from 'react';
import Notes from './Notes';
// import AddNote from './AddNote';
import Alert from './Alert';
import alertContext from '../context/alert/AlertContext';

const Home = ({ searchTag }) => {
  const context = useContext(alertContext);
  const { alert } = context;
  return (
    <>
      <Alert alert={alert} />
      {/* <AddNote showAlert={showAlert} /> */}
      <Notes searchTag={searchTag} />
    </>
  );
};

export default Home;
