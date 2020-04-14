import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import SearchPage from './SearchPage'
import shelves from './test/data/shelves-data.json'

afterEach(cleanup)

const onCloseSearch = jest.fn()
const onSearchChangeHandler = jest.fn()
const onSearchSubmitHandler = jest.fn()
const onMenuChangeHandler = jest.fn()
const defaultSearchResults = []
const renderComponent = ({ searchResults }) =>
  render(
    <SearchPage
      onCloseSearch={onCloseSearch}
      query=""
      onSearchChangeHandler={onSearchChangeHandler}
      onSearchSubmitHandler={onSearchSubmitHandler}
      onMenuChangeHandler={onMenuChangeHandler}
      shelves={shelves}
      searchResults={searchResults}
    />
  )

test('<SearchPage /> renders search bar', () => {
  const { getByText, getByPlaceholderText } = renderComponent(
    defaultSearchResults
  )
  const input = getByPlaceholderText(/Search by title or author/i)
  const closeButton = getByText(/close/i)

  expect(input).toBeInTheDocument()
  expect(closeButton).toBeInTheDocument()
})

it('calls "onCloseSearch" prop on click', () => {
  const { getByText } = renderComponent(defaultSearchResults)
  const closeButton = getByText(/close/i)

  fireEvent.click(closeButton)
  expect(onCloseSearch).toHaveBeenCalledTimes(1)
})

it('calls "onSearchChangeHandler" prop on search input', () => {
  const { getByPlaceholderText } = renderComponent(defaultSearchResults)
  const input = getByPlaceholderText(/Search by title or author/i)

  fireEvent.change(input, { target: { value: 'a' } })
  expect(onSearchChangeHandler).toHaveBeenCalledTimes(1)
})

it('indicates if no search results', () => {
  const { getByText } = renderComponent(defaultSearchResults)

  expect(getByText(/no results/i)).toBeInTheDocument()
})
