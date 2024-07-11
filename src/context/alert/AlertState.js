import { useState } from 'react';
import alertContext from './AlertContext';

function AlertState(props) {
  const [alert, setAlert] = useState('');

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  );
}

export default AlertState;
