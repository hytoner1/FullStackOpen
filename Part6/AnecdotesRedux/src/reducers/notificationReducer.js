let idTime = 0;

const notificationReducer = (state = 'Welcome', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
  {
    return action.notification;
  }
  case 'CLEAR_NOTIFICATION':
  {
    return '';
  }
  default:
  {
    return state;
  }
  }
};

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    clearTimeout(idTime);

    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    });

    idTime = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  };
};

export default notificationReducer;