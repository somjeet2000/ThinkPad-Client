import React from 'react';

const Alert = (props) => {
  return (
    <div
      className="alert alert-primary"
      role="alert"
      style={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }}
    >
      {props.message}
    </div>
  );
};

export default Alert;
