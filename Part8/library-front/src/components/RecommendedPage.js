import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';

import { ALL_BOOKS, ME } from '../queries'

const RecommendedPage = (props) => {
  const userResult = useQuery(ME);
  const favoriteGenre = userResult.data?.me?.favoriteGenre;
  console.log('fav genre:', favoriteGenre);

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    fetchPolicy: "no-cache"
  });
  
  if (!props.show) {
    return null
  }
  else {
    props.client.refetchQueries({ include: [ALL_BOOKS] });
  }

  if (userResult.loading || booksResult.loading) {
    return <div>Loading...</div>;
  }

  if (userResult.error || booksResult.error) {
    return `Error! ${userResult ? userResult.error : booksResult.error}`;
  }

  console.log('userResult:', userResult);
  console.log('booksResult:', booksResult);

  return (
    <div>
      <h2>Recommended for You based on genre "{favoriteGenre}":</h2>

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
          {booksResult.data?.allBooks?.map(b =>
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