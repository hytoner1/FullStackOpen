import React from 'react';
import {connect} from 'react-redux';

import {createAnecdote} from '../reducers/anecdoteReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();

    const text = event.target.text.value;
    event.target.text.value = '';

    props.createAnecdote(text);
    props.setNotification(`Added anecdote '${text}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='text'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default connect(null, {createAnecdote, setNotification})(AnecdoteForm);