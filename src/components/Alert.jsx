import React from 'react';

const Alert = (props) => {
  const { alert } = props;
  const capitalizeWord = (word) => {
    if (word === 'danger') {
      word = 'error';
    }
    const lowerCase = word.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
  };
  return (
    <div style={{ height: '50px' }}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          <strong>{capitalizeWord(alert.type)}</strong>: {alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
