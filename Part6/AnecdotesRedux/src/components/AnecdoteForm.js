import React from 'react';
import {useDispatch} from 'react-redux';

import {createAnecdote} from '../reducers/anecdoteReducer';
import {setNotification, clearNotification} from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    event.target.text.value = '';

    const newAnecdote = await anecdoteService.createNew(text);
    console.log('newAnecdote', newAnecdote);
    dispatch(createAnecdote(newAnecdote));

    dispatch(setNotification(`Added anecdote '${text}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
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