import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './Home'

describe('Home Page', () => {
  it('renders home page heading', () => {
    render(<Home />)
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
  })
})
