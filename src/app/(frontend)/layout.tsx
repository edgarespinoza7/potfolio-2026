import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import React from 'react'
import './styles.css'

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Edgar Espinoza — Front-end Engineer',
  description:
    'Front-end software engineer at Vizzuality, building interactive data visualizations and high-performance web apps that transform complex data into clear, intuitive experiences.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
