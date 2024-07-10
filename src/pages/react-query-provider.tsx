import { QueryClient as ReactQueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const queryClient = new ReactQueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex: number) => {
        return Math.min(1000 * 2 ** attemptIndex, 10000)
      },
      staleTime: 10000,
      refetchInterval: 60000,
    },
  },
})

export function ReactQueryProvider({
  children,
  withDevtools = false,
}: {
  children: ReactNode
  withDevtools?: boolean
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {withDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
