import React from 'react';
import Notes from './Notes';
import Alert from './Alert';
import AddNote from './AddNote';

const Home = () => {
  return (
    <>
      <Alert message="Your Note has been deleted!" />
      <AddNote />
      <Notes />
    </>
  );
};

export default Home;
