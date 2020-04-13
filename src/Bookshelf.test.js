import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Bookshelf from './Bookshelf'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const shelf = { value: 'currentlyReading', label: 'Currently Reading' }
const renderComponent = ({ shelf }) =>
  render(
    <Bookshelf
      shelf={shelf}
      books={books}
      shelves={shelves}
      onMenuChangeHandler={jest.fn()}
    />
  )

test('<Bookshelf /> renders a bookshelf', () => {
  const { getByText } = renderComponent({ shelf })

  expect(getByText(shelf.label, { selector: 'h2' })).toBeInTheDocument()
})

it('renders books belonging to shelf', () => {
  const { getByText } = renderComponent({ shelf })

  books
    .filter(book => book.shelf === shelf.value)
    .map(book => expect(getByText(book.title)).toBeInTheDocument)
})
