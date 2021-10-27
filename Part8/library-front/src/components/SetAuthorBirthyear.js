import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const SetAuthorBirthear = ({ authors }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [{ query: ALL_AUTHORS }] });

  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')
    await editAuthor({ variables: { name, year: parseInt(year) } });

    setYear('');
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value={''} key=''></option>
            {authors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />

        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
}

export default SetAuthorBirthear;