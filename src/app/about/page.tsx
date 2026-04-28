import PageHero from '@/components/PageHero'
import FinalCTA from '@/components/FinalCTA'

const VALUE_PROPS = [
  { number: '100%', label: 'Australian owned and operated' },
  { number: '24hr', label: 'From signup to live' },
  { number: '$0', label: 'No setup fees, ever' },
  { number: '14', label: 'Day money-back guarantee' },
]

const VALUES = [
  { title: 'Honest pricing', body: 'No setup fees. No hidden costs. The price you see is the price you pay.' },
  { title: 'Built for Australia', body: 'Australian voices, Australian accents, Australian-hosted data. Privacy Act compliant.' },
  { title: 'Speed over perfection', body: '24-hour go-live, not 6-week integrations. We ship fast and iterate with you.' },
  { title: 'Reliability first', body: 'Six layers of monitoring, daily health checks, public status page. Your phone never goes down.' },
  { title: 'Transparency with callers', body: "If a customer asks if they're talking to AI, we tell them. Always." },
  { title: 'Outcomes not features', body: "We measure success in revenue recovered for you. Not features shipped by us." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Built on the <span style={{ color: 'var(--orange)' }}>Gold Coast</span> for Australian business.</>}
        sub="A small team of Australians obsessed with one thing: making sure no Australian business ever loses a customer to an unanswered phone again."
      />

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="section-eyebrow">Our story</div>
          <h2 className="section-h dark" style={{ marginBottom: 22 }}>The reason TalkMate exists.</h2>
          <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: 14 }}>
              We started TalkMate on the Gold Coast in 2025 because we kept watching the same thing happen. A friend running a fish &amp; chip shop missing 30 orders a Friday night. A neighbour who runs a tow yard losing breakdown calls at 2am. A real estate mate who couldn&apos;t answer enquiries during open homes.
            </p>
            <p style={{ marginBottom: 14 }}>
              These are the businesses that built every Australian community. They don&apos;t need fancier websites. They don&apos;t need more SaaS. They need their phone answered, and they need it answered properly. Every single time.
            </p>
            <p>
              TalkMate is Australian-owned, operated from the Gold Coast, with all data on Australian servers. We&apos;re obsessed with making it work for the small businesses that are the backbone of every suburb. Speed, honesty, and outcomes. That&apos;s it.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {VALUE_PROPS.map(v => (
              <div key={v.label} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: 24, textAlign: 'center',
              }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-1px', lineHeight: 1, marginBottom: 8 }}>{v.number}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">What we believe</div>
            <h2 className="section-h dark">Six values. <span style={{ color: 'var(--orange)' }}>No fluff.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{
                background: 'white', border: '1px solid var(--edge)',
                borderRadius: 14, padding: 24,
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading={<>Come and say <span className="orange">g&apos;day</span>.</>}
        sub="We're based on the Gold Coast and we genuinely love talking to Australian business owners. Book a chat or shoot us an email."
        primary="Book a Demo"
        secondary="Email us"
        secondaryHref="mailto:hello@talkmate.com.au"
      />
    </>
  )
}
