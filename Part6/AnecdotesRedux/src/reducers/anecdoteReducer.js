

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
  case 'VOTE':
  {
    const id = action.data.id;
    const anecdoteToChange = state.find(a => a.id === id);
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 };
    return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
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

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data: data
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

export default anecdoteReducer;