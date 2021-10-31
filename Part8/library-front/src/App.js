import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';

import { BOOK_ADDED } from './queries'

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginPage from './components/LoginPage'
import RecommendedPage from './components/RecommendedPage'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}!`)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token
          ? <button onClick={() => setPage('add')}>add book</button>
          : null
        }

        {token
          ? <button onClick={() => setPage('recommended')}>Recommendations</button>
          : null
        }

        {token
          ? <button onClick={() => {
            setToken(null);
            localStorage.clear();
            client.resetStore();
          }}> Logout </button>
          : <button onClick={() => setPage('login')}>login</button>
        }
        
        
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <RecommendedPage
        show={page === 'recommended'}
        client={client}
      />

      <LoginPage
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App