import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrderBox from '@components/OrderBox'
import type { Order } from '@/types'

describe('OrderBox', () => {
  const mockOrders: Order[] = [
    {
      id: '100001',
      customer_name: 'John Doe',
      items: ['Burger', 'Fries'],
      status: 'received',
      created_at: '2024-01-01T10:00:00',
      updated_at: '2024-01-01T10:00:00',
    },
    {
      id: '100002',
      customer_name: 'Jane Smith',
      items: ['Pizza'],
      status: 'received',
      created_at: '2024-01-01T11:00:00',
      updated_at: '2024-01-01T11:00:00',
    },
  ]

  it('renders title correctly', () => {
    render(<OrderBox orders={mockOrders} status="received" />)
    
    expect(screen.getByText('Received')).toBeInTheDocument()
  })

  it('displays "No orders" when orders array is empty', () => {
    render(<OrderBox orders={[]} status="received" />)
    
    expect(screen.getByText('No orders')).toBeInTheDocument()
  })

  it('renders all orders in the box', () => {
    render(<OrderBox orders={mockOrders} status="received" />)
    
    expect(screen.getByText('100001')).toBeInTheDocument()
    expect(screen.getByText('100002')).toBeInTheDocument()
  })
})
