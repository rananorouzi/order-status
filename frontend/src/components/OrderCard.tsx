import type { OrderCardProps } from '@/types'

const OrderCard = ({ order, status, isNew }: OrderCardProps): JSX.Element => {
  const statusBorder =
    status === 'received'
      ? 'border-blue-700/80 dark:border-blue-700/60'
      : status === 'inProgress'
        ? 'border-amber-700/80 dark:border-amber-700/60'
        : status === 'readyToPickup'
          ? 'border-emerald-700/80 dark:border-emerald-700/60'
          : 'border-gray-300/80 dark:border-gray-600/60'

  return (
    <div
      className={[
        'rounded-lg px-3 py-2 transition-colors',
        'border border-current',
        statusBorder,
        'bg-white/70 dark:bg-white/5',
        'hover:bg-white dark:hover:bg-white/10',
        'text-gray-900 dark:text-gray-100',
        isNew ? 'animate-border-pulse' : '',
      ].join(' ')}
      data-order-id={order.id}
    >
      <span className="text-sm font-mono">{order.id}</span>
    </div>
  )
}

export default OrderCard
