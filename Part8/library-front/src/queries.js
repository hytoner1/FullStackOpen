import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
  query ALL_BOOKS($genre: String) {
    allBooks(genre: $genre) {
      title
      genres
      author {
        name
      }
      published
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{
        name
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, born: $year) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`