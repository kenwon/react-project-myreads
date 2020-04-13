import React from 'react'
import { cleanup, render } from '@testing-library/react'
import BookActionMenu from './BookActionMenu'
import books from './test/data/books-data.json'
import selectEvent from 'react-select-event'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const book = books[0]
const onMenuSubmitHandler = jest.fn()
const renderComponent = () =>
  render(<BookActionMenu book={book} shelves={shelves} onSubmitHandler={onMenuSubmitHandler} />)

test('<BookActionMenu /> renders a book action menu', () => {
  const { getByText } = renderComponent()

  expect(getByText(/move to.../i)).toBeInTheDocument()
})
