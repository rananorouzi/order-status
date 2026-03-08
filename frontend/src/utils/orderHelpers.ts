import type { Order, GroupedOrders } from '@/types'

const sortByUpdatedAtDesc = (a: Order, b: Order): number =>
  new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()

export const groupOrdersByStatus = (orders: Order[]): GroupedOrders => {
  return {
    received: orders.filter((order) => order.status === 'received').sort(sortByUpdatedAtDesc),
    'inProgress': orders.filter((order) => order.status === 'inProgress').sort(sortByUpdatedAtDesc),
    'readyToPickup': orders
      .filter((order) => order.status === 'readyToPickup')
      .sort(sortByUpdatedAtDesc),
  }
}
