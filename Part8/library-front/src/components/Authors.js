import React from 'react';
import { useQuery } from '@apollo/client';

import SetAuthorBirthYear from "./SetAuthorBirthyear";

import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token
        ? <div>
          <h2> Set Birthyear </h2>
          <SetAuthorBirthYear authors={authors} />
          </div>
        : null
      }
      

    </div>
  );
}

export default Authors;
