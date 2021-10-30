import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [getAllBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  if (!props.show) {
    return null
  }

  if (!loading && !data) {
    console.log('Getting all books');
    getAllBooks();
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return `Error! ${error}`;
  }

  const books = data?.allBooks;
  console.log(books);

  if (!books) {
    return null;
  }

  const genres = [...new Set(books.map(b => [...b.genres]).flat())];
  console.log(genres);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Filter by Genre</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <button onClick={() => getAllBooks()}>ALL</button>
            </td>
            {genres.map(g =>
              <td key={g}>
                <button onClick={() => {
                  getAllBooks({ variables: { genre: g } });
                  console.log(data);
                }}>{g}</button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Books