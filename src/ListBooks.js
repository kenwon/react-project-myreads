import React from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

const ListBooks = props => {
  const { shelves, books, onMenuChangeHandler, onOpenSearch } = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(shelf => (
          <Bookshelf
            key={shelf.value}
            shelf={shelf}
            books={books.filter(book => book.shelf === shelf.value)}
            shelves={shelves}
            onMenuChangeHandler={onMenuChangeHandler}
          />
        ))}
      </div>
      <div className="open-search">
        <button onClick={onOpenSearch}>Add a book</button>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  shelves: PropTypes.arrayOf(Object).isRequired,
  books: PropTypes.arrayOf(Object).isRequired,
  onMenuChangeHandler: PropTypes.func.isRequired,
  onOpenSearch: PropTypes.func.isRequired,
}

export default ListBooks
