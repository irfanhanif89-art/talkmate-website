import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StickyBottomBar from '@/components/StickyBottomBar'
import ChatbotWidget from '@/components/ChatbotWidget'

export const metadata: Metadata = {
  metadataBase: new URL('https://talkmate.com.au'),
  title: "TalkMate, Australia's AI Receptionist for Small Business",
  description: 'TalkMate is your AI receptionist. Answers every call in 2 seconds, takes orders, upsells customers, and never calls in sick. Live in 24 hours.',
  openGraph: {
    title: "TalkMate, Australia's AI Receptionist for Small Business",
    description: 'TalkMate is your AI receptionist. Answers every call in 2 seconds, takes orders, upsells customers, and never calls in sick. Live in 24 hours.',
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
        <ChatbotWidget />
      </body>
    </html>
  )
}
