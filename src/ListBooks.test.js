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
      onMenuChangeHandler={jest.fn()}
      onOpenSearch={jest.fn()}
    />
  )

test('<ListBooks /> renders bookshelves', () => {
  const { getByText } = renderComponent()

  shelves.map(shelf =>
    expect(getByText(shelf.label, { selector: 'h2' })).toBeInTheDocument()
  )
})

it('renders open search page button', () => {
  const { getByText } = renderComponent()

  expect(getByText(/add a book/i)).toBeInTheDocument()
})
