import React from 'react'
import { cleanup, render } from '@testing-library/react'
import BookActionMenu from './BookActionMenu'

afterEach(cleanup)

const renderComponent = () => render(<BookActionMenu />)

test('<BookActionMenu /> renders a book action menu', () => {
  const { getByText } = renderComponent()

  expect(getByText(/move to.../i)).toBeInTheDocument()
})
