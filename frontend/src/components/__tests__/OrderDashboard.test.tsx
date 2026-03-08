import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderDashboard from '@components/OrderDashboard'
import type { Order } from '@/types'

// Mock fetch
const mockFetch = vi.fn()
globalThis.fetch = mockFetch as typeof fetch

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
    mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

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
        id: '100001',
        customer_name: 'John Doe',
        items: ['Burger'],
        status: 'received',
        created_at: '2024-01-01T10:00:00',
        updated_at: '2024-01-01T10:00:00',
      },
      {
        id: '100002',
        customer_name: 'Jane Smith',
        items: ['Pizza'],
        status: 'inProgress',
        created_at: '2024-01-01T11:00:00',
        updated_at: '2024-01-01T11:00:00',
      },
      {
        id: '100003',
        customer_name: 'Bob Johnson',
        items: ['Tacos'],
        status: 'readyToPickup',
        created_at: '2024-01-01T12:00:00',
        updated_at: '2024-01-01T12:00:00',
      },
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrders,
    } as Response)

    render(
      <QueryClientProvider client={queryClient}>
        <OrderDashboard />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /New Orders/i })
      ).toBeInTheDocument()

      expect(
        screen.getByRole('heading', { name: /In Progress/i })
      ).toBeInTheDocument()

      expect(
        screen.getByRole('heading', { name: /Ready for Pickup/i })
      ).toBeInTheDocument()
    })

    expect(screen.getByText('100001')).toBeInTheDocument()
    expect(screen.getByText('100002')).toBeInTheDocument()
    expect(screen.getByText('100003')).toBeInTheDocument()
  })

  it('displays error message on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

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
