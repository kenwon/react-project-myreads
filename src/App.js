import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
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
    event.preventDefault()

    const shelf = event.target.value

    BooksAPI.update(book, shelf).then(this.updateBooks(book, shelf))

    this.redirectToMainPage()
  }

  updateBooks = (book, shelf) => {
    this.setState(currentState => {
      if (!currentState.books.find(item => item.id === book.id))
        return {
          books: currentState.books.concat([book]),
        }
    })

    this.setState(currentState => {
      return {
        books: currentState.books.map(item =>
          item.id === book.id ? { ...item, shelf: shelf } : item
        ),
      }
    })
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
