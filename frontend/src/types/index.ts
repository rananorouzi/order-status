export type OrderStatus = 'received' | 'inProgress' | 'readyToPickup'

export interface Order {
  id: string
  customer_name: string
  items: string[]
  status: OrderStatus
  created_at: string
  updated_at: string
}

export interface OrderBoxProps {
  orders: Order[]
  status: OrderStatus
}

export interface OrderCardProps {
  order: Order
  status?: OrderStatus
  isNew?: boolean
}

export interface GroupedOrders {
  'received': Order[]
  'inProgress': Order[]
  'readyToPickup': Order[]
}
