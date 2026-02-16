import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Salchipaperia D.C. | La Salchipapa Premium",
  description:
    "Salchipaperia D.C. La experiencia premium de salchipapas. 9 sedes en Bogota, Miami y proximamente Medellin.",
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Salchipaperia D.C. | La Salchipapa Premium",
    description: "La experiencia premium de salchipapas en Bogotá, Miami y Medellín.",
    images: [
      {
        url: "/imagen-metadata.jpg",
        width: 1200,
        height: 630,
        alt: "Salchipaperia D.C. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salchipaperia D.C. | La Salchipapa Premium",
    description: "La experiencia premium de salchipapas en Bogotá, Miami y Medellín.",
    images: ["/imagen-metadata.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

import { CartProvider } from '@/context/cart-context'
import { WhatsAppFAB } from '@/components/ui/whatsapp-fab'
import { OrderWizard } from '@/components/ui/order-wizard'
import { CustomCursor } from '@/components/ui/custom-cursor'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}
      >
        <CartProvider>
          <OrderWizard />
          <WhatsAppFAB />
          <CustomCursor />
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
