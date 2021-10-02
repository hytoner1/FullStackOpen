import React from 'react';
import {connect} from 'react-redux';

const Notification = (props) => {
  if (props.notification === '') {
    return (
      <div> 
      </div>
    );
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return (
    <div style={style}>
      {props.notification}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;