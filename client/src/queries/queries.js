import { gql } from '@apollo/client';
import AddBook from './../components/AddBook';

// Get all books
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

// Get all authors
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOKS_MUTATION = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, ADD_BOOKS_MUTATION };
