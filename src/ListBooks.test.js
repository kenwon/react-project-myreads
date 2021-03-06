import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListBooks from './ListBooks'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const renderComponent = () =>
  render(
    <MemoryRouter>
      <ListBooks
        books={books}
        shelves={shelves}
        onMenuChangeHandler={jest.fn()}
        onOpenSearch={jest.fn()}
      />
    </MemoryRouter>
  )

test('<ListBooks /> renders bookshelves', () => {
  const { getByText } = renderComponent()
  const displayedShelves = shelves.filter(shelf => shelf.value !== 'none')

  displayedShelves.map(shelf =>
    expect(getByText(shelf.label, { selector: 'h2' })).toBeInTheDocument()
  )
})

it('renders open search page button', () => {
  const { getByText } = renderComponent()

  expect(getByText(/add a book/i)).toBeInTheDocument()
})
