import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrderCard from '@components/OrderCard'
import type { Order } from '@/types'

describe('OrderCard', () => {
  const mockOrder: Order = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    customer_name: 'John Doe',
    items: ['Burger', 'Fries', 'Coke'],
    status: 'received',
    created_at: '2024-01-01T10:00:00',
    updated_at: '2024-01-01T10:30:00',
  }

  it('renders order number correctly', () => {
    render(<OrderCard order={mockOrder} />)
    
    // Should show last 6 characters of ID in uppercase
    expect(screen.getByText(/174000/)).toBeInTheDocument()
  })

  it('displays order number in monospace font', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    const orderNumber = container.querySelector('.font-mono')
    expect(orderNumber).toBeInTheDocument()
  })

})
