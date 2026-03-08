export const API_URL = 'http://localhost:8000/api/orders'

export const ORDER_STATUSES = {
  RECEIVED: 'received',
  IN_PROGRESS: 'inProgress',
  READY_TO_PICKUP: 'readyToPickup',
} as const

export const STATUS_COLORS = {
  received: {
    light: 'text-blue-600',
    dark: 'text-blue-400',
    bgLight: 'bg-blue-50',
    bgDark: 'bg-blue-900/20',
  },
  'inProgress': {
    light: 'text-amber-600',
    dark: 'text-amber-400',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-900/20',
  },
  'readyToPickup': {
    light: 'text-green-600',
    dark: 'text-green-400',
    bgLight: 'bg-green-50',
    bgDark: 'bg-green-900/20',
  },
} as const
