import React from 'react'
import { cleanup, render } from '@testing-library/react'
import ListBooks from './ListBooks'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const renderComponent = () =>
  render(
    <ListBooks
      books={books}
      shelves={shelves}
      onMenuSubmitHandler={jest.fn()}
    />
  )

test('<ListBooks /> renders bookshelves', () => {
  const { getByText } = renderComponent()

  expect(
    getByText(/currently reading/i, { selector: 'h2' })
  ).toBeInTheDocument()
  expect(getByText(/want to read/i, { selector: 'h2' })).toBeInTheDocument()
  expect(getByText(/finished/i, { selector: 'h2' })).toBeInTheDocument()
})
