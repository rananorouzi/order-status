import type { Order } from '@/types'
import { API_URL } from './constants'

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  return response.json() as Promise<Order[]>
}
