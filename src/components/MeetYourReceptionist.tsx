import { RECEPTIONISTS } from '@/lib/receptionists'
import AvatarCard from './AvatarCard'

// Dark-treatment section dropped between PricingCards and FinalCTA on the
// homepage. Anchor id matches the nav dropdown link from Part 7.

export default function MeetYourReceptionist() {
  return (
    <section
      id="meet-your-receptionist"
      style={{
        background: '#061322',
        padding: '96px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-eyebrow">Meet your receptionist</div>
          <h2 className="section-h">
            Trained for your industry. <span style={{ color: 'var(--bluel)' }}>Ready in 24 hours.</span>
          </h2>
          <p style={{
            fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
            marginTop: 14, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Every TalkMate receptionist knows your industry inside out. They ask the right questions, use the right
            terminology, and handle calls exactly the way your business needs. Click on any receptionist to see what they know.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 18,
          }}
          className="receptionist-grid"
        >
          {RECEPTIONISTS.map(r => (
            <AvatarCard key={r.slug} r={r} avatarSize={72} />
          ))}
        </div>

        <style>{`
          @media (max-width: 1080px) {
            .receptionist-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 600px) {
            .receptionist-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
