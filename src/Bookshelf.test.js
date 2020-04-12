import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Bookshelf from './Bookshelf'
import books from './test/data/books-data.json'

afterEach(cleanup)

const shelf = { name: 'currentlyReading', title: 'Currently Reading' }
const renderComponent = ({ shelf }) =>
  render(<Bookshelf shelf={shelf} books={books} />)

test('<Bookshelf /> renders a bookshelf', () => {
  const { getByText } = renderComponent({ shelf })

  expect(getByText(shelf.title, { selector: 'h2' })).toBeInTheDocument()
})

it('renders books belonging to shelf', () => {
  const { getByText } = renderComponent({ shelf })

  books
    .filter(book => book.shelf === shelf.name)
    .map(book => expect(getByText(book.title)).toBeInTheDocument)
})
