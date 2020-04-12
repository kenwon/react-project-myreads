import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import SearchPage from './SearchPage'

afterEach(cleanup)

const onCloseSearch = jest.fn()
const renderComponent = () =>
  render(<SearchPage onCloseSearch={onCloseSearch} />)

test('<SearchPage /> renders search bar', () => {
  const { getByText, getByPlaceholderText } = renderComponent()
  const input = getByPlaceholderText(/Search by title or author/i)
  const closeButton = getByText(/close/i)

  expect(input).toBeInTheDocument()
  expect(closeButton).toBeInTheDocument()
})

it('calls "onCloseSearch" prop on click', () => {
  const { getByText } = renderComponent()
  const closeButton = getByText(/close/i)

  fireEvent.click(closeButton)
  expect(onCloseSearch).toHaveBeenCalledTimes(1)
})
