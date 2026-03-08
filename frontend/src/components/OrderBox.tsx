import { useEffect, useRef, useState } from 'react'
import OrderCard from '@components/OrderCard'
import type { OrderBoxProps, OrderStatus } from '@/types'

type StatusStyles = {
  container: string
  title: string
}

const getStatusStyles = (status: OrderStatus): StatusStyles => {
  switch (status) {
    case 'received':
      return {
        container:
          'bg-blue-50 dark:bg-blue-950/40 border-blue-700 dark:border-blue-700/60',
        title: 'text-blue-700 dark:text-blue-300',
      }
    case 'inProgress':
      return {
        container:
          'bg-amber-50 dark:bg-amber-950/40 border-amber-700 dark:border-amber-700/60',
        title: 'text-amber-700 dark:text-amber-300',
      }
    case 'readyToPickup':
      return {
        container:
          'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-700 dark:border-emerald-700/60',
        title: 'text-emerald-700 dark:text-emerald-300',
      }
    default:
      return {
        container:
          'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700',
        title: 'text-gray-800 dark:text-gray-200',
      }
  }
}

const getStatusTitle = (status: OrderStatus): string => {
  switch (status) {
    case 'received':
      return '🆕 New Orders'
    case 'inProgress':
      return '👨‍🍳 In Progress'
    case 'readyToPickup':
      return '📦 Ready for Pickup'
    default:
      return 'Orders'
  }
}

const OrderBox = ({ orders, status }: OrderBoxProps): JSX.Element => {
  const [highlightedIds, setHighlightedIds] = useState<string[]>([])
  const prevIdsRef = useRef<string[]>([])

  // Detect new orders for this status and briefly highlight them
  useEffect(() => {
    const prevIds = prevIdsRef.current
    const currentIds = orders.map((o) => o.id)
    const newIds = currentIds.filter((id) => !prevIds.includes(id))

    prevIdsRef.current = currentIds

    if (!newIds.length) return

    setHighlightedIds((prev) => [...prev, ...newIds])

    const timeoutId = window.setTimeout(() => {
      setHighlightedIds((prev) => prev.filter((id) => !newIds.includes(id)))
    }, 1200)

    return () => window.clearTimeout(timeoutId)
  }, [orders])

  const styles = getStatusStyles(status)
  const title = getStatusTitle(status)

  return (
    <div
      className={`rounded-lg shadow-md dark:shadow-gray-900/50 p-4 flex flex-col h-full border ${styles.container}`}
    >
      <h2 className={`text-lg font-semibold mb-3 ${styles.title}`}>{title}</h2>

      <div className="flex-1 overflow-y-auto min-h-0">
        {orders.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
            No orders
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {orders.map((order) => {
              const isNew = highlightedIds.includes(order.id)
              return (
                <OrderCard
                  key={order.id}
                  order={order}
                  status={status}
                  isNew={isNew}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderBox