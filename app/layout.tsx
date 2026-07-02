import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  title: 'Matthew Nicholson — Full-Stack Developer',
  description:
    'Full-stack developer based in Brooklyn → Remote. Building with TypeScript, React & Node.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
        <div style={{ maxWidth: '2560px', margin: '0 auto' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
