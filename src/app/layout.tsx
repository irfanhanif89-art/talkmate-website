import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StickyBottomBar from '@/components/StickyBottomBar'

export const metadata: Metadata = {
  metadataBase: new URL('https://talkmate.com.au'),
  title: 'TalkMate — AI Voice Agent for Australian Business',
  description: 'Every missed call is a customer going elsewhere. TalkMate answers every call in under 2 seconds, takes orders, books jobs, and sends SMS confirmations. Live in 24 hours. Gold Coast owned and operated.',
  openGraph: {
    title: 'TalkMate — AI Voice Agent for Australian Business',
    description: 'Every missed call is a customer going elsewhere. TalkMate fixes that in 24 hours.',
    url: 'https://talkmate.com.au',
    siteName: 'TalkMate',
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyBottomBar />
      </body>
    </html>
  )
}
