import React from 'react';

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

const exports = { Notification, ErrorNotification };
export default exports;