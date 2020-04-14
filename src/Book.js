import React from 'react'
import PropTypes from 'prop-types'
import BookActionMenu from './BookActionMenu'

const Book = props => {
  const { data, shelves, onMenuChangeHandler } = props
  const image =
    data.imageLinks && data.imageLinks.thumbnail
      ? `url(${data.imageLinks.thumbnail})`
      : null

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: image,
            }}
            data-testid="book-cover"
          ></div>
          <BookActionMenu
            book={data}
            shelves={shelves}
            onChangeHandler={onMenuChangeHandler}
          />
        </div>
        <div className="book-title">{data.title}</div>
        {data.authors ? (
          data.authors.map(author => (
            <div className="book-authors" key={author}>
              {author}
            </div>
          ))
        ) : (
          <div className="book-authors">{data.publisher}</div>
        )}
      </div>
    </li>
  )
}

Book.propTypes = {
  data: PropTypes.object.isRequired,
  shelves: PropTypes.arrayOf(Object).isRequired,
  onMenuChangeHandler: PropTypes.func.isRequired,
}
export default Book
