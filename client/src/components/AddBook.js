import { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, ADD_BOOKS_MUTATION } from '../queries/queries';

const displayAuthors = (loading, error, data) => {
  if (loading) return <option disabled>Loading...</option>;
  if (error) return <option disabled>Error Loading authors</option>;

  if (data) {
    const { authors } = data;
    return authors.map((author, index) => {
      return (
        <option key={index} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
};

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { mutData, mutError }] = useMutation(ADD_BOOKS_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, genre, authorId);
    addBook({ variables: { name, genre, authorId } });
  };

  return (
    <Fragment>
      <form id='add-book' onSubmit={onSubmit}>
        <div className='field'>
          <label>Book name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='field'>
          <label>Genre:</label>
          <input
            type='text'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className='field'>
          <label>Author:</label>
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option>Select Author</option>
            {displayAuthors(loading, error, data)}
          </select>
        </div>

        <button>+</button>
      </form>
      {mutError && <p>{mutError}</p>}
      {mutData && <p>{mutData}</p>}
    </Fragment>
  );
}

export default AddBook;
