import { useQuery } from '@tanstack/react-query'
import OrderBox from '@components/OrderBox'
import { fetchOrders } from '@/utils/api'
import { groupOrdersByStatus } from '@/utils/orderHelpers'
import type { Order } from '@/types'

const OrderDashboard = (): JSX.Element => {
  const { data: orders = [], isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchInterval: 2000, // Poll every 2 seconds
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-700 dark:text-gray-200">Loading orders...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600 dark:text-red-400">
          Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
        </div>
      </div>
    )
  }

  const groupedOrders = groupOrdersByStatus(orders)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <OrderBox 
        orders={groupedOrders['received']} 
        status="received"
      />
      <OrderBox 
        orders={groupedOrders['inProgress']} 
        status="inProgress"
      />
      <OrderBox 
        orders={groupedOrders['readyToPickup']} 
        status="readyToPickup"
      />
    </div>
  )
}

export default OrderDashboard
