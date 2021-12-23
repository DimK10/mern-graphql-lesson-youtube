import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

const displayBooks = (loading, error, data) => {
  if (loading) return <p>Loading....</p>;

  if (error) return <p>{error}</p>;

  if (data)
    return data.books.map((book, index) => {
      return <li key={index}>{book.name}</li>;
    });
};

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <div>
      <ul id='book-list'>{displayBooks(loading, error, data)}</ul>
    </div>
  );
}

export default BookList;
