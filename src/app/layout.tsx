'use client'

import { checkIsPublicRoute } from '@/functions/check-is-public-route'
import './globals.css'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import PrivateRoute from '@/components/PrivateRoute'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPublicPage = checkIsPublicRoute(pathname)

  return (
    <html lang="en">
      <body className={inter.className}>
        {isPublicPage && children}
        {!isPublicPage && (
          <PrivateRoute>
            {children}
          </PrivateRoute>
        )}
      </body>
    </html>
  )
}
