import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    title: 'MyReads',
    query: '',
    books: [],
    shelves: [
      { value: 'currentlyReading', label: 'Currently Reading' },
      { value: 'wantToRead', label: 'Want to Read' },
      { value: 'read', label: 'Finished' },
      { value: 'none', label: 'None' },
    ],
    searchResults: [],
  }

  onCloseSearch = () => {
    this.redirectToMainPage()
  }

  redirectToMainPage = () => {
    this.props.history.push('/')
  }

  onMenuChangeHandler = (event, book) => {
    event.persist()

    const shelf = event.target.value

    BooksAPI.update(book, shelf).then(this.updateBooks(book, shelf))
  }

  updateBooks = (book, shelf) => {
    // Add book to `books` if it's not there
    this.setState(currentState => {
      book.shelf = shelf
      return !currentState.books.find(item => item.id === book.id)
        ? {
            books: currentState.books.concat([book]),
          }
        : null
    })

    // Remove current book if shelf is set to 'none'
    this.setState(currentState =>
      shelf === 'none' && currentState.books.find(item => item.id === book.id)
        ? {
            books: currentState.books.filter(item => item.id !== book.id),
          }
        : null
    )

    // Keep only shelved books in `books` and update current book's shelf, then
    // update shelf key for current book in search results.
    this.setState(currentState => ({
      books: currentState.books
        .filter(item => item.shelf !== 'none')
        .map(item => (item.id === book.id ? { ...item, shelf } : item)),
      searchResults: currentState.searchResults.map(item =>
        item.id === book.id ? { ...item, shelf: shelf } : item
      ),
    }))
  }

  onSearchChangeHandler = event => {
    const query = event.target.value

    this.setState(() => ({ query }))

    BooksAPI.search(query.trim()).then(results => {
      !results || results.error
        ? this.setState(() => ({
            searchResults: [],
          }))
        : this.setState(() => ({
            searchResults: results,
          }))
    })
  }

  componentDidMount() {
    document.title = this.state.title

    BooksAPI.getAll().then(books =>
      this.setState(() => ({
        books: books,
      }))
    )
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <ListBooks
              books={this.state.books}
              shelves={this.state.shelves}
              onMenuChangeHandler={this.onMenuChangeHandler}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              onCloseSearch={this.onCloseSearch}
              query={this.state.query}
              onSearchChangeHandler={this.onSearchChangeHandler}
              searchResults={this.state.searchResults}
              books={this.state.books}
              shelves={this.state.shelves}
              onMenuChangeHandler={this.onMenuChangeHandler}
            />
          )}
        />
      </div>
    )
  }
}

export default withRouter(BooksApp)
