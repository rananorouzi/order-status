import type { OrderCardProps } from '@/types'

const OrderCard = ({ order }: OrderCardProps): JSX.Element => {
  // Extract order number from ID (last 6 characters)
  const orderNumber = order.id.slice(-6).toUpperCase()

  return (
    <div className="inline-block mr-2 border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 transition-colors">
      <span className="text-sm font-mono text-gray-700">{orderNumber}</span>
    </div>
  )
}

export default OrderCard
