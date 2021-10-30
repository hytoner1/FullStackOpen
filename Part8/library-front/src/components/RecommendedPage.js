import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';

import { ALL_BOOKS, ME } from '../queries'

const RecommendedPage = (props) => {
  const userResult = useQuery(ME);
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { /*genre: userResult.data.favoriteGenre*/ }
  });
  //const [getAllBooks, { booksResult }] = useLazyQuery(ALL_BOOKS);
//  const booksQuery = useLazyQuery(ALL_BOOKS, );

  if (!props.show) {
    return null
  }

  if (userResult.loading) {
    return <div>Loading...</div>;
  }


  if (userResult.loading || booksResult?.loading) {
    return <div>Loading...</div>;
  }

  if (userResult?.error || booksResult?.error) {
    return `Error! ${userResult ? userResult.error : booksResult.error}`;
  }

  const books = booksResult?.data.allBooks;
  console.log(books);

  if (!books) {
    return null;
  }

  return (
    <div>
      <h2>Recommended for You</h2>

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
    </div>
  )
}

export default RecommendedPage