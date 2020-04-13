import React from 'react'
import PropTypes from 'prop-types'

const BookActionMenu = props => {
  const { book, shelves, onSubmitHandler } = props
  return (
    <div className="book-shelf-changer">
      <form onSubmit={onSubmitHandler} data-testid={`${book.id}-action-form`}>
        <select
          name="menu"
          id="menu"
          value={book.shelf ? book.shelf : 'none'}
          onChange={event => onSubmitHandler(event, book)}
          data-testid={`${book.id}-action-menu`}
        >
          <option value="move" disabled>
            Move to...
          </option>
          {shelves.map(shelf => (
            <option key={shelf.value} value={shelf.value}>
              {shelf.label}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

BookActionMenu.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.arrayOf(Object).isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
}

export default BookActionMenu
