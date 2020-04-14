import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import SearchPage from './SearchPage'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const onCloseSearch = jest.fn()
const onSearchChangeHandler = jest.fn()
const onSearchSubmitHandler = jest.fn()
const onMenuChangeHandler = jest.fn()
const renderComponent = () =>
  render(
    <SearchPage
      onCloseSearch={onCloseSearch}
      query=""
      onSearchChangeHandler={onSearchChangeHandler}
      onSearchSubmitHandler={onSearchSubmitHandler}
      onMenuChangeHandler={onMenuChangeHandler}
      shelves={shelves}
    />
  )

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

it('calls "onSearchChangeHandler" prop on search input', () => {
  const { getByPlaceholderText } = renderComponent()
  const input = getByPlaceholderText(/Search by title or author/i)

  fireEvent.change(input, { target: { value: 'a' } })
  expect(onSearchChangeHandler).toHaveBeenCalledTimes(1)
})

it('calls "onSearchSubmitHandler" prop on search submit', () => {
  const { getByPlaceholderText } = renderComponent()
  const input = getByPlaceholderText(/Search by title or author/i)

  fireEvent.submit(input, { target: { value: 'a' } })
  expect(onSearchSubmitHandler).toHaveBeenCalledTimes(1)
})
