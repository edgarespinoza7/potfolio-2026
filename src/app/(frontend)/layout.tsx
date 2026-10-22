import type { Metadata } from 'next'
import { Geist_Mono, Hanken_Grotesk } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer/Footer'

import './styles.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-hanken',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Edgar Espinoza — Full-stack Engineer',
  description:
    'Full-stack engineer. I build high-performance web apps and interactive data visualizations that help people explore, understand, and act on complex datasets.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${hanken.variable} ${geistMono.variable}`}>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
