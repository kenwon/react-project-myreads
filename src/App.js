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

  onOpenSearch = () => this.setState({ showSearchPage: true })

  onCloseSearch = () => {
    this.redirectToMainPage()
  }

  redirectToMainPage = () => {
    this.setState(() => ({ showSearchPage: false }))
  }

  onMenuChangeHandler = (event, book) => {
    event.persist()
    event.preventDefault()

    const shelf = event.target.value

    this.setState(currentState => ({
      books: currentState.books.map(item =>
        item.id === book.id ? { ...item, shelf: shelf } : item
      ),
    }))

    BooksAPI.update(book, shelf)

    this.redirectToMainPage()
  }

  onSearchChangeHandler = event => {
    const query = event.target.value

    this.setState(() => ({ query }))
  }

  onSearchSubmitHandler = event => {
    event.persist()
    event.preventDefault()

    const query = this.state.query.trim()

    BooksAPI.search(query).then(results => {
      results.error
        ? this.setState(() => ({
            searchResults: [],
          }))
        : this.setState(() => ({
            searchResults: results,
          }))
    })

    this.searchReset()
  }

  searchReset = () => {
    this.setState(() => ({
      query: '',
    }))
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
          <SearchPage
            onCloseSearch={this.onCloseSearch}
            query={this.state.query}
            onSearchChangeHandler={this.onSearchChangeHandler}
            onSearchSubmitHandler={this.onSearchSubmitHandler}
            searchResults={this.state.searchResults}
            shelves={this.state.shelves}
            onMenuChangeHandler={this.onMenuChangeHandler}
          />
        ) : (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onMenuChangeHandler={this.onMenuChangeHandler}
            onOpenSearch={this.onOpenSearch}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
