import React from 'react'
import { fireEvent, createEvent, cleanup, render } from '@testing-library/react'
import BookActionMenu from './BookActionMenu'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const book = books.find(book => book.id === 'nggnmAEACAAJ')
const onChangeHandler = jest.fn()
const renderComponent = () =>
  render(
    <BookActionMenu
      book={book}
      shelves={shelves}
      onChangeHandler={onChangeHandler}
    />
  )

test('<BookActionMenu /> renders a book action menu', () => {
  const { getByText } = renderComponent()

  expect(getByText(/move to.../i)).toBeInTheDocument()
})

it('calls "onSubmitHandler" when clicking or submitting form', () => {
  const { getByTestId } = renderComponent()
  const actionForm = getByTestId(`${book.id}-action-form`)
  const actionSelect = getByTestId(`${book.id}-action-menu`)

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
