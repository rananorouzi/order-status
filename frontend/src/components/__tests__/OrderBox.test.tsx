import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrderBox from '@components/OrderBox'
import type { Order } from '@/types'

describe('OrderBox', () => {
  const mockOrders: Order[] = [
    {
      id: '1',
      customer_name: 'John Doe',
      items: ['Burger', 'Fries'],
      status: 'received',
      created_at: '2024-01-01T10:00:00',
      updated_at: '2024-01-01T10:00:00',
    },
    {
      id: '2',
      customer_name: 'Jane Smith',
      items: ['Pizza'],
      status: 'received',
      created_at: '2024-01-01T11:00:00',
      updated_at: '2024-01-01T11:00:00',
    },
  ]

  it('renders title and order count', () => {

    render(<OrderBox title="Received" orders={mockOrders} statusColor="bg-blue-500" />)
    expect(screen.getByText('Received')).toBeInTheDocument()
    
  })

  it('displays "No orders" when orders array is empty', () => {

    render(<OrderBox title="Received" orders={[]} statusColor="bg-blue-500" />)
    expect(screen.getByText('No orders')).toBeInTheDocument()

  })

})
