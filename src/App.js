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
      { value: 'currentlyReading', label: 'Currently Reading' },
      { value: 'wantToRead', label: 'Want to Read' },
      { value: 'read', label: 'Finished' },
      { value: 'none', label: 'None' },
    ],
  }

  onOpenSearch = () => this.setState({ showSearchPage: true })

  onCloseSearch = () => {
    this.setState(() => ({ showSearchPage: false }))
  }

  onMenuSubmitHandler = (event, book) => {
    event.persist()
    event.preventDefault()

    const shelf = event.target.value

    this.setState(currentState => ({
      books: currentState.books.map(item =>
        item.id === book.id ? { ...item, shelf: shelf } : item
      ),
    }))

    BooksAPI.update(book, shelf)
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
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onMenuSubmitHandler={this.onMenuSubmitHandler}
            onOpenSearch={this.onOpenSearch}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
