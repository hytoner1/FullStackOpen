import React from 'react';
import {useDispatch} from 'react-redux';

import {createAnecdote} from '../reducers/anecdoteReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const text = event.target.text.value;
    event.target.text.value = '';

    dispatch(createAnecdote(text));
    dispatch(setNotification(`Added anecdote '${text}'`, 5));
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

export default AnecdoteForm;