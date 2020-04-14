import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BooksApp from './App'

afterEach(cleanup)

test('<BooksApp /> renders page header', () => {
  const { getByText } = render(
    <MemoryRouter>
      <BooksApp />
    </MemoryRouter>
  )
  const title = getByText(/myreads/i)

  expect(title).toBeInTheDocument()
})
