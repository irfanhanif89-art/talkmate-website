import Link from 'next/link'
import { Mail } from 'lucide-react'
import PageHero from '@/components/PageHero'

// Founder story body. Each entry renders as a <p> in the order listed.
// Word-for-word from the brief, do not edit without checking the brief.
const STORY_PARAGRAPHS: string[] = [
  'For eleven years I ran a tow truck company. At our peak we had eight trucks on the road plus subcontractors, servicing road construction companies, international shipping clients, roadside assistance companies 24 hours a day, the Australian Formula One Grand Prix, and land sub developers in Victoria. From the outside it looked like success. From the inside it was eleven years of never being able to switch off.',
  "In all my years of business and the thousands of people I have interacted with, this is what I have learnt. It doesn't matter if you're a tow truck operator, a plumber, a pizza shop owner, or a real estate agent. The moment you become the face of the business, everyone wants you. Every problem lands on your phone. Every new customer, every urgent job, every question that could have been answered by anyone. It all comes to you.",
  "And if you miss that call, particularly from a new customer who found you through Google, they don't wait. They go straight back to the list and call the next business on the page. That click cost you money whether you know it or not.",
  "There were stretches in that business where cash flow was so tight that every single job mattered. Meeting payroll that week wasn't a given. It was something I had to fight for. So it didn't matter if I was at a family dinner, out with friends, or sitting at my child's birthday party. If the phone rang, I answered it. I couldn't afford not to.",
  "What I couldn't see clearly at the time was what that was costing me in a different way. The constant availability, the inability to ever be fully present, the weight of carrying the whole business on my shoulders. It took a serious toll on my health, my mental state, and ultimately on my family life. After eleven years of building something I was proud of, I found myself exhausted, disconnected from the people I loved most, and wondering why I had started the business in the first place.",
  'I became a business owner for freedom. I had built anything but.',
  "After I exited my company I started showing up at networking events, seminars, and industry meetups, looking for the next opportunity. What I found instead was something I wasn't expecting. I came to learn that so many other business owners resonated with my story in one way or another. It didn't matter what industry they were in. A beauty salon owner. A trades business. A restaurant. An NDIS provider. The same story, different faces. Working in the business, not on it. Answering every call because they couldn't afford to miss it. Sacrificing everything outside of work just to keep it afloat.",
  "That's when TalkMate became clear to me.",
  'Not as a technology product. Not as an AI company. As something far more personal than that.',
  "TalkMate is the receptionist I needed and couldn't afford. It answers every call in two seconds, handles the enquiry, takes the order, books the job, and lets you get on with your life. It doesn't matter if you're an owner operator doing everything yourself or a larger business that needs a reliable first point of contact. TalkMate works for both.",
  "But honestly, when I picture the person I built this for, it's the version of me from ten years ago. The business owner who is doing everything, the work, the marketing, the invoices, the emails, and the phone calls, and slowly losing themselves in the process. The one who just wants to take their partner out for dinner without their phone buzzing on the table. The one who wants to be at their kid's birthday party and actually be there.",
  "If that's you, TalkMate is for you.",
  "I'm Irfan Hanif, founder of TalkMate. I'm based on the Gold Coast and genuinely proud of what we've built. If you'd like to know more or just want to have a conversation about your business, send me an email and I'll give you a call. I still love a good chat.",
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>Built by a business owner. <span style={{ color: 'var(--orange)' }}>For business owners.</span></>}
        sub="The story behind TalkMate and why it exists."
      />

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Lead paragraph, larger than body, draws the reader in. */}
          <p style={{
            fontSize: 22,
            lineHeight: 1.5,
            color: 'var(--navy)',
            fontWeight: 600,
            letterSpacing: '-0.3px',
            marginBottom: 32,
          }}>
            I built TalkMate because I know exactly what it costs when you miss that call.
          </p>

          <div style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.85 }}>
            {STORY_PARAGRAPHS.map((p, i) => (
              <p key={i} style={{ marginBottom: i === STORY_PARAGRAPHS.length - 1 ? 0 : 20 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA card, matches the existing site's light-background card pattern. */}
      <section style={{ background: 'var(--light)', paddingTop: 0 }}>
        <div className="section-pad" style={{ maxWidth: 720, margin: '0 auto', paddingTop: 0 }}>
          <div style={{
            background: 'white',
            border: '1px solid var(--edge)',
            borderRadius: 18,
            padding: 32,
            textAlign: 'center' as const,
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--navy)',
              letterSpacing: '-0.5px',
              lineHeight: 1.3,
              marginBottom: 10,
            }}>
              Want to know if TalkMate is right for your business?
            </h2>
            <p style={{
              fontSize: 15,
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: 22,
            }}>
              Send Irfan an email and he&apos;ll give you a call.
            </p>
            <Link
              href="mailto:hello@talkmate.com.au"
              className="btn-orange"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '13px 24px' }}
            >
              <Mail size={15} /> Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
