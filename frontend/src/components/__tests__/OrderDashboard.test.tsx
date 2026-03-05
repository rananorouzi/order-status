import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderDashboard from '@components/OrderDashboard'
import type { Order } from '@/types'

// Mock fetch
global.fetch = vi.fn() as typeof fetch

describe('OrderDashboard', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
  })

  it('displays loading state initially', () => {

    ;(global.fetch as ReturnType<typeof vi.fn>).mockImplementation(() => new Promise(() => {})) // Never resolves

    render(
      <QueryClientProvider client={queryClient}>
        <OrderDashboard />
      </QueryClientProvider>
    )

    expect(screen.getByText('Loading orders...')).toBeInTheDocument()
  })

  it('displays orders grouped by status', async () => {
    const mockOrders: Order[] = [
      {
        id: '1',
        customer_name: 'John Doe',
        items: ['Burger'],
        status: 'received',
        created_at: '2024-01-01T10:00:00',
        updated_at: '2024-01-01T10:00:00',
      },
      {
        id: '2',
        customer_name: 'Jane Smith',
        items: ['Pizza'],
        status: 'in progress',
        created_at: '2024-01-01T11:00:00',
        updated_at: '2024-01-01T11:00:00',
      },
      {
        id: '3',
        customer_name: 'Bob Johnson',
        items: ['Tacos'],
        status: 'ready to pickup',
        created_at: '2024-01-01T12:00:00',
        updated_at: '2024-01-01T12:00:00',
      },
    ]

    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrders,
    } as Response)

    render(
      <QueryClientProvider client={queryClient}>
        <OrderDashboard />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Received')).toBeInTheDocument()
      expect(screen.getByText('In Progress')).toBeInTheDocument()
      expect(screen.getByText('Ready to Pickup')).toBeInTheDocument()
    })
  })

  it('displays error message on fetch failure', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'))

    render(
      <QueryClientProvider client={queryClient}>
        <OrderDashboard />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })
})
