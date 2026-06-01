import Script from 'next/script'

/**
 * Embeds TalkMate's own AI Website Chatbot on every page to demo the product.
 *
 * MANUAL HANDOFF: this stays dormant until the env var is set. Irfan/Donna must
 * set NEXT_PUBLIC_TALKMATE_CHATBOT_BUSINESS_ID in Vercel to TalkMate's real
 * business UUID. Until then nothing is rendered and no script loads.
 */
export default function ChatbotWidget() {
  const chatbotId = process.env.NEXT_PUBLIC_TALKMATE_CHATBOT_BUSINESS_ID

  if (!chatbotId) return null

  return (
    <Script
      // ?v bumped to bust the browser/CDN cache when the widget script
      // changes (it's a static file with no content hash). v2 = Firefox
      // caret/typing hardening.
      src="https://app.talkmate.com.au/widget/talkmate-chat.js?v=2"
      data-business-id={chatbotId}
      strategy="afterInteractive"
    />
  )
}
