import React from 'react'
import { cleanup, render } from '@testing-library/react'
import BooksApp from './App'

afterEach(cleanup)

test('<BooksApp /> renders page header', () => {
  const { getByText } = render(<BooksApp />)
  const title = getByText(/myreads/i)

  expect(title).toBeInTheDocument()
})
