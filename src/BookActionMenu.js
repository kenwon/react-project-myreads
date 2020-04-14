import React from 'react'
import PropTypes from 'prop-types'

const BookActionMenu = props => {
  const { book, shelves, onChangeHandler } = props
  const currentShelf = book.shelf ? book.shelf : 'none'

  return (
    <div className="book-shelf-changer">
      <form data-testid={`${book.id}-action-form`}>
        <select
          name="menu"
          id="menu"
          value={currentShelf}
          onChange={event => onChangeHandler(event, book)}
          data-testid={`${book.id}-action-menu`}
        >
          <option value="move" disabled>
            Move to...
          </option>

          {shelves.map(shelf => {
            // Don't display 'None' option if the book isn't on a shelf
            if (shelf.value === 'none' && currentShelf === 'none') return null

            return (
              <option
                key={shelf.value}
                value={shelf.value}
                data-testid={`${book.id}-option-${shelf.value}`}
              >
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
  shelves: PropTypes.arrayOf(Object).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
}

export default BookActionMenu
