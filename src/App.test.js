import React from 'react'
import { cleanup, render } from '@testing-library/react'
import BooksApp from './App'

afterEach(cleanup)

test('<BooksApp /> renders page header', () => {
  const { getByText } = render(<BooksApp />)
  const title = getByText(/myreads/i)

  expect(title).toBeInTheDocument()
})

test('<BooksApp /> renders bookshelves', () => {
  const { getByText } = render(<BooksApp />)

  expect(
    getByText(/currently reading/i, { selector: 'h2' })
  ).toBeInTheDocument()
  expect(getByText(/want to read/i, { selector: 'h2' })).toBeInTheDocument()
  expect(getByText(/finished/i, { selector: 'h2' })).toBeInTheDocument()
})
