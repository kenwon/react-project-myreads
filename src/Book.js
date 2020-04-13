import React from 'react'
import PropTypes from 'prop-types'
import BookActionMenu from './BookActionMenu'

const Book = props => {
  const { data, shelves, onMenuSubmitHandler } = props
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${data.imageLinks.thumbnail})`,
            }}
            data-testid="book-cover"
          ></div>
          <BookActionMenu
            book={data}
            shelves={shelves}
            onSubmitHandler={onMenuSubmitHandler}
          />
        </div>
        <div className="book-title">{data.title}</div>
        {data.authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))}
      </div>
    </li>
  )
}

Book.propTypes = {
  data: PropTypes.object.isRequired,
  shelves: PropTypes.arrayOf(Object).isRequired,
  onMenuSubmitHandler: PropTypes.func.isRequired,
}
export default Book
