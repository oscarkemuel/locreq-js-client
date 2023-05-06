'use client'

import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PrivateRoute from '@/components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          {isPublicPage && children}
          {!isPublicPage && (
            <PrivateRoute>
              {children}
            </PrivateRoute>
          )}
        </QueryClientProvider>
      </body>
    </html>
  )
}
