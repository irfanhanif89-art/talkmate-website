import PageHero from '@/components/PageHero'

// Full Privacy Policy v2.0 (April 2026). Source: portal lib/legal-docs.ts —
// the same text clients sign in onboarding. Keep these two in sync.

export const metadata = {
  title: 'Privacy Policy · TalkMate',
  description: 'How TalkMate collects, uses, and protects your data. Privacy Act 1988 (Cth) compliant.',
}

const SECTIONS: Array<{ heading: string; body: string }> = [
  {
    heading: '1. Introduction',
    body: 'TalkMate Pty Ltd is committed to protecting personal information in accordance with the Australian Privacy Act 1988. This policy explains how we collect, use, store, and disclose personal information.',
  },
  {
    heading: '2. Information we collect about you (the business owner)',
    body: '2.1 Account information: your name, business name, email address, phone number, and billing details when you create an account.\n2.2 Usage data: how you use the TalkMate portal, which features you access, and when.\n2.3 Payment information: processed and stored by Stripe. TalkMate does not store credit card numbers.',
  },
  {
    heading: '3. Information we process on your behalf (caller data)',
    body: '3.1 When your customers call your TalkMate-powered number, we process their call on your behalf.\n3.2 This may include their phone number, name if provided during the call, the content of their conversation with TalkMate, and any details they provide such as addresses, preferences, or enquiry details.\n3.3 This data belongs to you. You are the data controller. TalkMate is the data processor. See our Data Processing Agreement for full details.\n3.4 We do not use your customers\' data for any purpose other than providing the TalkMate service to you.',
  },
  {
    heading: '4. How we use your information',
    body: '4.1 To provide and improve the TalkMate service.\n4.2 To process your subscription payments.\n4.3 To send you service-related communications including usage alerts and product updates.\n4.4 To provide customer support.',
  },
  {
    heading: '5. Data storage and security',
    body: '5.1 All data is stored on servers located in Australia.\n5.2 Data is encrypted in transit using TLS and at rest.\n5.3 Access to your data is restricted to TalkMate staff who need it to provide support.',
  },
  {
    heading: '6. Data retention',
    body: '6.1 Your account data is retained for the duration of your subscription and deleted within 30 days of account closure on request.\n6.2 Call recordings are retained for 90 days by default. Adjustable in account settings.\n6.3 Contact records and call transcripts are retained for the duration of your subscription.',
  },
  {
    heading: '7. Your rights',
    body: '7.1 You have the right to access the personal information TalkMate holds about you.\n7.2 You have the right to request correction of inaccurate information.\n7.3 You have the right to request deletion of your data subject to legal retention requirements.\n7.4 You can export all your contact data at any time from your portal settings.\n7.5 To exercise these rights contact hello@talkmate.com.au.',
  },
  {
    heading: '8. Third party services',
    body: 'TalkMate uses the following third party services to provide the platform:\n• Vapi: voice AI infrastructure (USA, data processing agreement in place)\n• ElevenLabs: voice synthesis (USA, data processing agreement in place)\n• Supabase: database hosting (AWS ap-southeast-2, Sydney)\n• Stripe: payment processing (USA, PCI DSS compliant)\n• Vercel: application hosting (USA, data processing agreement in place)\n• Make.com: workflow automation (EU, data processing agreement in place)',
  },
  {
    heading: '9. Complaints',
    body: 'If you have a privacy concern contact hello@talkmate.com.au. If we cannot resolve your concern you may contact the Office of the Australian Information Commissioner at oaic.gov.au.',
  },
  {
    heading: '10. Changes to this policy',
    body: 'We will notify you of material changes to this policy by email and by notice in your portal. Continued use of the Service after notification constitutes acceptance.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        sub="Plain English. No legal hide-and-seek. We comply with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
      />
      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 760, margin: '0 auto', color: 'var(--navy)' }}>
          <article style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 14, padding: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Version 2.0</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', marginBottom: 22 }}>TalkMate Privacy Policy</h2>
            {SECTIONS.map(s => (
              <div id={s.heading} key={s.heading} style={{ marginBottom: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{s.heading}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const, margin: 0 }}>{s.body}</p>
              </div>
            ))}
            <p id="act" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 30 }}>Last updated: April 2026</p>
          </article>
        </div>
      </section>
    </>
  )
}
