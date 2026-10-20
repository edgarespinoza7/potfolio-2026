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
  title: 'Edgar Espinoza — Front-end Engineer',
  description:
    'Front-end engineer at Vizzuality specializing in data visualization. I build interactive data stories and high-performance web apps that help people explore, understand, and take action.',
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
