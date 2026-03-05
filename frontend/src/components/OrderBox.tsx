import OrderCard from '@components/OrderCard'
import type { OrderBoxProps } from '@/types'

const OrderBox = ({ title, orders, statusColor }: OrderBoxProps): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className={`${statusColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
          {orders.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
        {orders.length === 0 ? (
          <div className="text-gray-400 text-center py-4 text-sm">No orders</div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  )
}

export default OrderBox
