import React from 'react'
import PropTypes from 'prop-types'

const BookActionMenu = props => {
  const { book, shelves, books, onChangeHandler } = props
  const existingBook = books.find(item => item.id === book.id)
  const currentShelf =
    existingBook && existingBook.shelf ? existingBook.shelf : 'none'

  return (
    <div
      className={
        existingBook
          ? 'book-shelf-changer book-in-collection'
          : 'book-shelf-changer'
      }
      data-testid={`${book.id}-action-menu`}
    >
      <form data-testid={`${book.id}-action-form`}>
        <select
          name="menu"
          id="menu"
          value={currentShelf}
          onChange={event => onChangeHandler(event, book)}
          data-testid={`${book.id}-action-select`}
        >
          <option value="move" disabled>
            {currentShelf === 'none' ? 'Add to...' : 'Move to...'}
          </option>

          {shelves.map(shelf => {
            return (
              <option key={shelf.value} value={shelf.value}>
                {shelf.label}
              </option>
            )
          })}
        </select>
      </form>
    </div>
  )
}

BookActionMenu.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(Object).isRequired,
  shelves: PropTypes.arrayOf(Object).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
}

export default BookActionMenu
