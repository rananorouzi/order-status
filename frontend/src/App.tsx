import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderDashboard from '@components/OrderDashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchInterval: 2000, // Poll every 2 seconds for real-time updates
    },
  },
})

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 flex flex-col">
        <header className="bg-white shadow-sm flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <h1 className="text-2xl font-bold text-gray-900">Order Status Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4">
          <OrderDashboard />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
