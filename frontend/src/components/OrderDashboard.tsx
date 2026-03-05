import { useQuery } from '@tanstack/react-query'
import OrderBox from '@components/OrderBox'
import type { Order, GroupedOrders } from '@/types'

const API_URL = 'http://localhost:8000/api/orders'

const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  return response.json() as Promise<Order[]>
}

const OrderDashboard = (): JSX.Element => {
  const { data: orders = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-lg text-red-600">
          Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
        </div>
      </div>
    )
  }

  // Group orders by status
  const groupedOrders: GroupedOrders = {
    'received': orders.filter((order) => order.status === 'received'),
    'in progress': orders.filter((order) => order.status === 'in progress'),
    'ready to pickup': orders.filter((order) => order.status === 'ready to pickup'),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <OrderBox 
        title="Received" 
        orders={groupedOrders['received']} 
        statusColor="bg-blue-500"
      />
      <OrderBox 
        title="In Progress" 
        orders={groupedOrders['in progress']} 
        statusColor="bg-yellow-500"
      />
      <OrderBox 
        title="Ready to Pickup" 
        orders={groupedOrders['ready to pickup']} 
        statusColor="bg-green-500"
      />
    </div>
  )
}

export default OrderDashboard
