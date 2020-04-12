import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Book from './Book'
import books from './test/data/books-data.json'

afterEach(cleanup)

const book = books[1]
const renderComponent = () => render(<Book data={book} />)

test('<Book /> renders a book', () => {
  const { getByText, getByTestId } = renderComponent()

  expect(getByText(book.title)).toBeInTheDocument()
  book.authors.forEach(author => {
    expect(getByText(author)).toBeInTheDocument()
  })
  expect(getByTestId('book-cover').getAttribute('style')).toContain(
    book.imageLinks.thumbnail
  )
})
