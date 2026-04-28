import PageHero from '@/components/PageHero'

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        sub="The fine print, in plain English."
      />
      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 760, margin: '0 auto', color: 'var(--navy)' }}>
          <article style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 14, padding: 32, fontSize: 14, lineHeight: 1.75, color: 'var(--muted)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>The agreement</h2>
            <p style={{ marginBottom: 18 }}>By signing up for TalkMate you agree to these terms. TalkMate is provided by TalkMate Pty Ltd, registered in Queensland, Australia.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Subscription &amp; cancellation</h2>
            <p style={{ marginBottom: 18 }}>Plans are billed monthly in advance. You can cancel anytime from the portal. No setup fees. Service continues to the end of your current billing period.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Money-back guarantee</h2>
            <p style={{ marginBottom: 18 }}>14 days from going live. Full refund, no questions asked. Email <a href="mailto:hello@talkmate.com.au" style={{ color: 'var(--orange)' }}>hello@talkmate.com.au</a>.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Acceptable use</h2>
            <p style={{ marginBottom: 18 }}>Don&apos;t use TalkMate for spam, fraud, or anything illegal. We reserve the right to suspend service for abuse.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Service availability</h2>
            <p style={{ marginBottom: 18 }}>We target 99.5% monthly availability. Status at <a href="/status" style={{ color: 'var(--orange)' }}>status.talkmate.com.au</a>. Force majeure events excluded.</p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Limitation of liability</h2>
            <p style={{ marginBottom: 18 }}>Our total liability is capped at fees paid in the 3 months preceding any claim. Australian Consumer Law non-excludable rights are not affected.</p>

            <p style={{ fontSize: 12, color: 'var(--muted)' }}>Last updated: April 2026</p>
          </article>
        </div>
      </section>
    </>
  )
}
