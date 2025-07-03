import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karigari Kit Example',
  description: 'Example app showcasing Karigari Kit components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
} 