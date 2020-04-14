import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Book from './Book'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const book = books[1]
const renderComponent = book =>
  render(<Book data={book} shelves={shelves} onMenuChangeHandler={jest.fn()} />)

test('<Book /> renders a book', () => {
  const { getByText, getByTestId } = renderComponent(book)

  expect(getByText(book.title)).toBeInTheDocument()
  book.authors.forEach(author => {
    expect(getByText(author)).toBeInTheDocument()
  })
  expect(getByTestId('book-cover').getAttribute('style')).toContain(
    book.imageLinks.thumbnail
  )
})

it('does not display "none" menu option if book is not belong to a shelf ', () => {
  const book = books.find(book => book.shelf === undefined)

  const { getByTestId } = renderComponent(book)
  const select = getByTestId(`${book.id}-action-menu`)

  if (!book.shelf) {
    expect(select[4]).toBeUndefined()
  }
})
