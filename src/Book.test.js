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

it('display "Add to" menu heading if book does not belong to a shelf ', () => {
  const book = books.find(book => book.shelf === undefined)

  const { getByText, getByTestId } = renderComponent(book)

  if (!book.shelf) {
    expect(getByText(/Add to/)).toBeInTheDocument()
  }
})
