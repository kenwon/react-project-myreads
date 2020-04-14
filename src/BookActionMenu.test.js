import React from 'react'
import { fireEvent, cleanup, render } from '@testing-library/react'
import BookActionMenu from './BookActionMenu'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'
import searchResults from './test/data/search-results-data.json'

afterEach(cleanup)

const book = books.find(book => book.id === 'nggnmAEACAAJ')
const onChangeHandler = jest.fn()
const renderComponent = book =>
  render(
    <BookActionMenu
      book={book}
      books={books}
      shelves={shelves}
      onChangeHandler={onChangeHandler}
    />
  )

test('<BookActionMenu /> renders a book action menu', () => {
  const { getByText } = renderComponent(book)

  expect(getByText(/move to.../i)).toBeInTheDocument()
  expect()
})

test('an already shelved book renders correct action menu', () => {
  const { getByTestId } = renderComponent(book)

  expect(getByTestId(`${book.id}-action-menu`)).toHaveProperty(
    'className',
    'book-shelf-changer book-in-collection'
  )
})

test('an unshelved book renders correct action menu', () => {
  const book = searchResults.find(book => book.id === '2wr48i-mqjIx')
  const { getByTestId } = renderComponent(book)

  expect(getByTestId(`${book.id}-action-menu`)).toHaveProperty(
    'className',
    'book-shelf-changer'
  )
})

it('calls "onSubmitHandler" when clicking or submitting form', () => {
  const { getByTestId } = renderComponent(book)
  const actionForm = getByTestId(`${book.id}-action-form`)
  const actionSelect = getByTestId(`${book.id}-action-select`)

  expect(actionForm).toHaveFormValues({ menu: 'currentlyReading' })

  fireEvent.change(actionSelect, {
    target: { value: 'wantToRead' },
  })
  expect(onChangeHandler).toHaveBeenCalledTimes(1)

  fireEvent.click(actionSelect, { target: { value: 'wantToRead' } })
  expect(onChangeHandler).toHaveBeenCalledTimes(1)
  expect(actionSelect.value).toBe('wantToRead')

  fireEvent.submit(actionSelect, { target: { value: 'read' } })
  expect(onChangeHandler).toHaveBeenCalledTimes(1)
  expect(actionSelect.value).toBe('read')
})
