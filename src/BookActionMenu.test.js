import React from 'react'
import { fireEvent, cleanup, render } from '@testing-library/react'
import BookActionMenu from './BookActionMenu'
import books from './test/data/books-data.json'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const book = books[0]
const onMenuSubmitHandler = jest.fn()
const onSubmitHandler = onMenuSubmitHandler
const renderComponent = () =>
  render(
    <BookActionMenu
      book={book}
      shelves={shelves}
      onSubmitHandler={onMenuSubmitHandler}
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

  fireEvent.change(actionSelect)
  expect(onSubmitHandler).toHaveBeenCalledTimes(1)

  fireEvent.submit(actionSelect)
  expect(onSubmitHandler).toHaveBeenCalledTimes(2)
})
