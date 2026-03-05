export interface Order {
  id: string
  customer_name: string
  items: string[]
  status: 'received' | 'in progress' | 'ready to pickup'
  created_at: string
  updated_at: string
}

export interface OrderBoxProps {
  title: string
  orders: Order[]
  statusColor: string
}

export interface OrderCardProps {
  order: Order
}

export type OrderStatus = 'received' | 'in progress' | 'ready to pickup'

export interface GroupedOrders {
  'received': Order[]
  'in progress': Order[]
  'ready to pickup': Order[]
}
