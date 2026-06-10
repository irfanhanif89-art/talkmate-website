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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TalkMate, Australia\'s AI Receptionist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TalkMate, Australia's AI Receptionist for Small Business",
    description: 'TalkMate is your AI receptionist. Answers every call in 2 seconds, takes orders, upsells customers, and never calls in sick. Live in 24 hours.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Session 77 — marketing tracking, feature-flagged on env vars. When the var
  // is blank nothing renders, so this is a safe no-op until Irfan sets the IDs.
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  return (
    <html lang="en-AU">
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {clarityId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`,
            }}
          />
        )}
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Nav />
        <main>{children}</main>
        <Footer />
        <StickyBottomBar />
        <ChatbotWidget />
      </body>
    </html>
  )
}
