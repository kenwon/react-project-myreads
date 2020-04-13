import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = props => {
  const { shelf, books, shelves, onMenuSubmitHandler } = props
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                data={book}
                shelves={shelves}
                onMenuSubmitHandler={onMenuSubmitHandler}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(Object).isRequired,
  shelves: PropTypes.arrayOf(Object).isRequired,
  onMenuSubmitHandler: PropTypes.func.isRequired,
}

export default Bookshelf
