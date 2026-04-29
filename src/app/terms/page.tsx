import PageHero from '@/components/PageHero'

// Full Terms of Service v2.0 (April 2026). Source: portal lib/legal-docs.ts.

export const metadata = {
  title: 'Terms of Service · TalkMate',
  description: 'TalkMate Terms of Service. The agreement between you and TalkMate Pty Ltd.',
}

const SECTIONS: Array<{ heading: string; body: string }> = [
  { heading: '1. Introduction', body: 'These Terms of Service govern your use of the TalkMate platform operated by TalkMate Pty Ltd (ABN TBC), a company registered in Queensland, Australia. By completing the onboarding process and activating your TalkMate account you agree to be bound by these terms.' },
  { heading: '2. The service', body: 'TalkMate provides AI-powered voice agent services, business communication tools, and related software (the Service). The Service includes the TalkMate Voice Agent, TalkMate Command, the TalkMate client portal, and any related features.' },
  { heading: '3. Subscription and payment', body: '3.1 The Service is provided on a monthly subscription basis at the rates displayed at talkmate.com.au/pricing at the time of subscription.\n3.2 Subscriptions are billed monthly in advance. Payment is processed by Stripe.\n3.3 There are no setup fees on any plan.\n3.4 You may cancel your subscription at any time from your portal settings. Cancellation takes effect at the end of the current billing period.\n3.5 TalkMate reserves the right to change subscription pricing with 30 days written notice to existing subscribers.' },
  { heading: '4. Money-back guarantee', body: '4.1 If TalkMate is not working for your business within the first 14 days of your agent going live, contact us at hello@talkmate.com.au for a full refund of your first month\'s subscription.\n4.2 The guarantee applies once per business. It does not apply to account reactivations.' },
  { heading: '5. Your responsibilities', body: '5.1 You are responsible for ensuring your use of TalkMate complies with all applicable Australian laws.\n5.2 You are responsible for informing your callers that calls may be recorded. TalkMate recommends enabling the call recording disclosure feature in your agent settings.\n5.3 You are responsible for ensuring your customers are aware of how their data is handled, in accordance with the Australian Privacy Act 1988.\n5.4 You must not use TalkMate for any unlawful purpose or in any way that could damage, disable, or impair the Service.' },
  { heading: '6. Call recording and transcription', body: '6.1 Calls answered by TalkMate are recorded and transcribed for the purpose of providing the Service.\n6.2 Call recordings and transcripts are stored on Australian servers.\n6.3 You can configure TalkMate to include a recording disclosure at the start of every call from your agent settings. TalkMate recommends this be enabled.\n6.4 Call recordings are retained for 90 days by default. You can adjust this in your account settings.' },
  { heading: '7. Intellectual property', body: '7.1 TalkMate retains ownership of all intellectual property in the TalkMate platform, software, and technology.\n7.2 You retain ownership of all data you provide to TalkMate and all contact data collected through your use of the Service.' },
  { heading: '8. Limitation of liability', body: '8.1 TalkMate is not liable for any indirect, incidental, or consequential losses arising from your use of the Service.\n8.2 TalkMate\'s total liability to you for any claim arising under these terms is limited to the amount you paid for the Service in the 3 months preceding the claim.\n8.3 TalkMate does not guarantee that the Service will be available at all times. Planned maintenance and unexpected outages may occur.' },
  { heading: '9. Termination', body: '9.1 TalkMate may suspend or terminate your account if you breach these terms.\n9.2 On termination you may export your contact data within 30 days. After 30 days data will be deleted.' },
  { heading: '10. Governing law', body: 'These terms are governed by the laws of Queensland, Australia.' },
  { heading: '11. Contact', body: 'TalkMate Pty Ltd\nhello@talkmate.com.au\ntalkmate.com.au\nGold Coast, Queensland, Australia' },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        sub="The fine print, in plain English. The same text every TalkMate client signs during onboarding."
      />
      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 760, margin: '0 auto', color: 'var(--navy)' }}>
          <article style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 14, padding: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Version 2.0</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', marginBottom: 22 }}>TalkMate Terms of Service</h2>
            {SECTIONS.map(s => (
              <div key={s.heading} style={{ marginBottom: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{s.heading}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const, margin: 0 }}>{s.body}</p>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 30 }}>Last updated: April 2026</p>
          </article>
        </div>
      </section>
    </>
  )
}
