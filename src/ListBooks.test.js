import React from 'react'
import { cleanup, render } from '@testing-library/react'
import ListBooks from './ListBooks'
import books from './test/data/books-data.json'

afterEach(cleanup)

const shelves = [
  { name: 'currentlyReading', title: 'Currently Reading' },
  { name: 'wantToRead', title: 'Want to Read' },
  { name: 'read', title: 'Finished' },
]
const renderComponent = () =>
  render(<ListBooks shelves={shelves} books={books} />)

test('<ListBooks /> renders bookshelves', () => {
  const { getByText } = renderComponent()

  expect(
    getByText(/currently reading/i, { selector: 'h2' })
  ).toBeInTheDocument()
  expect(getByText(/want to read/i, { selector: 'h2' })).toBeInTheDocument()
  expect(getByText(/finished/i, { selector: 'h2' })).toBeInTheDocument()
})
