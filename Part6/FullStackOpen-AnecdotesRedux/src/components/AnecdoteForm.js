import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {createAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    event.target.text.value = '';
    dispatch(createAnecdote(text));
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