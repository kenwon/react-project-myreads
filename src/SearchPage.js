import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const SearchPage = props => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={props.onCloseSearch}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <form onSubmit={props.onSearchSubmitHandler}>
            <input
              type="text"
              placeholder="Search by title or author"
              value={props.query}
              onChange={props.onSearchChangeHandler}
            />
          </form>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.searchResults
            ? props.searchResults.map(book => (
                <Book
                  key={book.id}
                  data={book}
                  shelves={props.shelves}
                  onMenuChangeHandler={props.onMenuChangeHandler}
                />
              ))
            : ''}
        </ol>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  onSearchChangeHandler: PropTypes.func.isRequired,
  onSearchSubmitHandler: PropTypes.func.isRequired,
  searchResults: PropTypes.oneOfType([
    PropTypes.arrayOf(Object),
    PropTypes.object,
  ]),
  shelves: PropTypes.arrayOf(Object).isRequired,
  onMenuChangeHandler: PropTypes.func.isRequired,
}

export default SearchPage
