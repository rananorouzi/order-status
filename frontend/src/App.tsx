import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OrderDashboard from '@components/OrderDashboard'
import ThemeToggle from '@components/ThemeToggle'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchInterval: 2000,
    },
  },
})

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-sm flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Order Status Dashboard
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 py-4">
          <OrderDashboard />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
