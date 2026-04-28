import PageHero from '@/components/PageHero'

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
          <article style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 14, padding: 32, fontSize: 14, lineHeight: 1.75, color: 'var(--muted)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>What we collect</h2>
            <p style={{ marginBottom: 18 }}>Business contact details (name, email, phone, business name) when you sign up or book a demo. Inbound call audio, transcripts, and metadata. Payment details processed by Stripe (we never store card numbers).</p>

            <h2 id="act" style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Where we store it</h2>
            <p style={{ marginBottom: 18 }}>All client and call data is stored on Australian-region servers. We comply with the Privacy Act 1988 (Cth), the Australian Privacy Principles, and the Notifiable Data Breaches scheme.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Who we share with</h2>
            <p style={{ marginBottom: 18 }}>Service providers under data-processing agreements: Vapi (voice infrastructure), ElevenLabs (voice synthesis), Stripe (payments), Resend (email). We never sell or rent personal information.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Your rights</h2>
            <p style={{ marginBottom: 18 }}>You can access, correct, or request deletion of your personal information at any time. Email <a href="mailto:hello@talkmate.com.au" style={{ color: 'var(--orange)' }}>hello@talkmate.com.au</a>.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Call recording</h2>
            <p style={{ marginBottom: 18 }}>We record inbound calls for service delivery and quality assurance. The agent announces "This call may be recorded for quality purposes" when configured. Customers in NSW and SA: please consider all-party-consent obligations in your jurisdiction.</p>

            <p style={{ fontSize: 12, color: 'var(--muted)' }}>Last updated: April 2026</p>
          </article>
        </div>
      </section>
    </>
  )
}
