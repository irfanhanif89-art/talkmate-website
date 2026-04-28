import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { Phone } from 'lucide-react'

const SECTIONS: Array<{ heading: string; faqs: Array<{ q: string; a: string }> }> = [
  {
    heading: 'The Product',
    faqs: [
      { q: 'Does TalkMate work for my type of business?', a: 'TalkMate works for any business that takes inbound calls. We have specific configurations for restaurants, towing, real estate, trades, healthcare, NDIS providers, retail, and professional services. If your business takes calls, TalkMate is built for you.' },
      { q: 'Will my customers know they\'re talking to an AI?', a: 'Most won\'t. The voice is natural and the conversation is conversational. If a caller directly asks, TalkMate always answers honestly. We believe in transparency.' },
      { q: 'What if the AI gets something wrong?', a: 'Confidence thresholds mean TalkMate transfers to you rather than guesses. From your portal you can flag any incorrect response and it\'s used to retrain the agent. You stay in control.' },
      { q: 'Is my data stored in Australia?', a: 'Yes. All data is stored on Australian servers. We are Privacy Act 1988 compliant and follow the Australian Privacy Principles (APPs).' },
      { q: 'How accurate is TalkMate?', a: 'Across our active client base, the answer rate is 100% (every call is answered) and the AI resolution rate (no transfer needed) sits between 78% and 94% depending on industry.' },
    ],
  },
  {
    heading: 'Setup and Onboarding',
    faqs: [
      { q: 'How long does setup take?', a: '24 hours from signup to live. We onboard you on a 30-minute call, train the agent on your specifics, set up call forwarding, and you\'re live the next business day.' },
      { q: 'Do I need to change my phone number?', a: 'No. Forward your existing business number to the TalkMate number we provision. Customers keep calling the same number you\'ve always advertised.' },
      { q: 'What if my menu or services change?', a: 'Update them from the portal. Changes sync to your AI agent within seconds. Or, on Growth and Pro plans, just text TalkMate Command: "Add prawn cutlets $18.50 to specials" and it updates instantly.' },
      { q: 'Can I review what TalkMate sounds like before going live?', a: 'Yes. Once we\'ve trained your agent, you call the preview number and listen. We don\'t go live until you approve it.' },
    ],
  },
  {
    heading: 'Pricing and Billing',
    faqs: [
      { q: 'Is there a setup fee?', a: 'No. There is never a setup fee. Every plan is monthly subscription only.' },
      { q: 'What happens if I exceed my call limit?', a: 'Overage is $0.45 per call. We send alerts at 80% and 95% so you can upgrade or accept the overage. No surprise bills.' },
      { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from your portal. You keep service through the end of your current billing period.' },
      { q: 'What does the 14-day money-back guarantee cover?', a: 'Full refund, no questions asked, within 14 days of going live. If TalkMate isn\'t recovering revenue for you, we don\'t want to keep your money.' },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Honest answers. <span style={{ color: 'var(--orange)' }}>No spin.</span></>}
        sub="The questions Australian business owners actually ask before they sign up."
      />

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 820, margin: '0 auto' }}>
          {SECTIONS.map(section => (
            <div key={section.heading} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 18 }}>{section.heading}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.faqs.map(({ q, a }) => (
                  <details key={q} style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 12, padding: '16px 22px' }}>
                    <summary style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                      <span>{q}</span>
                      <span style={{ color: 'var(--orange)', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginTop: 12 }}>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            background: 'white', border: '1px solid var(--edge)', borderRadius: 16, padding: 32, textAlign: 'center',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Still have questions?</h3>
            <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 22, lineHeight: 1.6 }}>
              Talk to a real person on the Gold Coast. We&apos;ll answer honestly. No sales scripts.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/demo" className="btn-orange">Book a Demo</Link>
              <a href="mailto:hello@talkmate.com.au" className="btn-ghost-light"><Phone size={16} /> Email us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
