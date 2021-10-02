import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  if (notification === '') {
    return (
      <div> 
      </div>
    );
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification