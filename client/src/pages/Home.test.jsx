import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home Page', () => {
  it('renders home page heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText(/shop by category/i)).toBeInTheDocument()
  })
})
