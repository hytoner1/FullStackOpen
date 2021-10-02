import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
  case 'VOTE':
  {
    const id = action.data.id;
    return state.map(anecdote => anecdote.id !== id ? anecdote : action.data);
  }
  case 'NEW_ANECDOTE':
  {
    return [...state, action.data];
  }
  case 'INIT_ANECDOTES':
  {
    return action.data;
  }
  }

  return state;
};

export const createAnecdote = text => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(text);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToChange = anecdotes.find(a => a.id === id);
    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1};

    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default anecdoteReducer;