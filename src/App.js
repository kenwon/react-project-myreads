import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    shelves: [
      { name: 'currentlyReading', title: 'Currently Reading' },
      { name: 'wantToRead', title: 'Want to Read' },
      { name: 'read', title: 'Finished' },
    ],
  }

  onCloseSearch = () => {
    this.setState(() => ({ showSearchPage: false }))
  }

  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState(() => ({
        books: books,
      }))
    )
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage onCloseSearch={this.onCloseSearch} />
        ) : (
          <ListBooks shelves={this.state.shelves} books={this.state.books} />
        )}
      </div>
    )
  }
}

export default BooksApp
