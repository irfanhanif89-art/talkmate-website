'use client'

import { useEffect, useRef, useState } from 'react'
import { EofyWas, EofyBadge } from '@/components/EofySale'
import './talkmate-home.css'

const VAPI_PUBLIC_KEY = '829a1868-99e0-4365-a86d-528752f4bbaa'
const VAPI_ASSISTANTS: Record<string, string> = {
  receptionist: 'ca0752a1-b87b-49eb-93d7-b83ea864494c',
  dispatcher: 'e0190f41-a823-4670-8006-ea94177210f1', // towing demo template — canonical dispatcher
}

type VapiState = 'idle' | 'connecting' | 'active' | 'error'

const VALUE_STACK: { icon: string; title: string; body: string }[] = [
  { icon: '🛠️', title: 'Built and trained for you', body: 'We set it up on your services, prices, hours and rules, then test it before it takes a single call.' },
  { icon: '📞', title: 'Every call answered, 24/7', body: 'Nights, weekends and the 8am rush. Several callers at once, nobody left on hold.' },
  { icon: '📅', title: 'Books the job', body: 'Takes the details, books it into Google Calendar or ServiceM8 and texts the customer a confirmation.' },
  { icon: '🚨', title: 'Emergencies to your on-call team', body: 'Urgent calls get put straight through, or texted to whoever is on call tonight.' },
  { icon: '🙋', title: 'A real person when it counts', body: 'Callers can always be transferred to your team. Nobody gets stuck talking to a bot.' },
  { icon: '📱', title: 'Everything in the TalkMate app', body: 'Every call, booked job and recording, with instant alerts on your iPhone. Or on your laptop, plus texts and email.' },
  { icon: '💬', title: 'Follow-up done for you', body: 'Missed-call win-back texts, and a Google review request after every job.' },
  { icon: '🔌', title: 'Works with your tools', body: 'ServiceM8, Google Calendar, a chat assistant for your website, and Zapier for everything else.' },
]

const COMPARE_ROWS: [string, string, string, string][] = [
  ['Who sets it up', 'We build and train it for you', 'You do it yourself', 'They follow a script'],
  ['Books the job', 'Yes, and texts a confirmation', 'Yes, once you set it up', 'No, they take a message'],
  ['Urgent jobs', 'Put through or texted to your on-call person', 'Transfers, if you set them up', 'They pass on a message'],
  ['Several calls at once', 'Yes', 'Yes', 'Depends who is on shift'],
  ['A real person when needed', 'Always', 'Varies', 'Yes'],
  ['Price', 'From $299 a month, calls included', '$0 to $149 a month, plus your time', 'About $1 to $5 a call'],
  ['Try it first', 'Free 7 days, set up for you', 'Free plan, you set it up', 'Varies'],
]

export default function HomePage() {
  // ----- live demo role picker -----
  const [activeRole, setActiveRole] = useState('receptionist')

  // ----- Vapi live demo -----
  const vapiRef = useRef<{ start: (id: string) => Promise<unknown>; stop: () => void; on: (evt: string, fn: (...args: unknown[]) => void) => void } | null>(null)
  const [vapiState, setVapiState] = useState<VapiState>('idle')
  const [vapiErr, setVapiErr] = useState('')

  useEffect(() => {
    let cancelled = false
    let vapi: { start: (id: string) => Promise<unknown>; stop: () => void; on: (evt: string, fn: (...args: unknown[]) => void) => void } | null = null
    import('@vapi-ai/web').then(({ default: Vapi }) => {
      if (cancelled) return
      vapi = new Vapi(VAPI_PUBLIC_KEY) as unknown as typeof vapi
      vapiRef.current = vapi
      vapi!.on('call-start', () => setVapiState('active'))
      vapi!.on('call-end', () => setVapiState('idle'))
      vapi!.on('error', (e: unknown) => {
        console.error('Vapi error', e)
        setVapiErr('Could not connect — check mic permissions and try again.')
        setVapiState('error')
        setTimeout(() => { setVapiState('idle'); setVapiErr('') }, 4000)
      })
    }).catch(() => {
      console.error('Vapi SDK failed to load')
    })
    return () => {
      cancelled = true
      vapi?.stop()
    }
  }, [])

  const handleDemoClick = async () => {
    if (!vapiRef.current) return
    if (vapiState === 'active') {
      vapiRef.current.stop()
      setVapiState('idle')
      return
    }
    if (vapiState === 'connecting') return
    const assistantId = VAPI_ASSISTANTS[activeRole]
    if (!assistantId) return
    setVapiState('connecting')
    try {
      await vapiRef.current.start(assistantId)
    } catch (e) {
      console.error(e)
      setVapiErr('Could not connect — check mic permissions and try again.')
      setVapiState('error')
      setTimeout(() => { setVapiState('idle'); setVapiErr('') }, 4000)
    }
  }

  // stop call if user switches role mid-call
  useEffect(() => {
    if (vapiState === 'active') {
      vapiRef.current?.stop()
      setVapiState('idle')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole])

  // ----- sticky CTA -----
  const [stickyShow, setStickyShow] = useState(false)
  const [stickyDismissed, setStickyDismissed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('tm-sticky-dismissed') === '1') {
      setStickyDismissed(true)
      return
    }
    const onScroll = () => {
      const past = window.scrollY > 700
      const docBottom = document.documentElement.scrollHeight
      const nearBottom = window.scrollY + window.innerHeight > docBottom - 120
      setStickyShow(past && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismissSticky = () => {
    sessionStorage.setItem('tm-sticky-dismissed', '1')
    setStickyDismissed(true)
    setStickyShow(false)
  }

  // ----- smooth scroll on anchor clicks -----
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') || ''
    if (href.length > 1 && href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // ----- photo loader (silent) -----
  // images are referenced directly via <img src> with onError fallback below

  // ----- hero phone call simulation -----
  const [callerLabel, setCallerLabel] = useState('incoming call')
  const [callerName, setCallerName] = useState('Unknown caller')
  const [callerSub, setCallerSub] = useState('Mobile · +61 4XX XXX XXX')
  const [callStatus, setCallStatus] = useState('TalkMate is answering · 1.2s')
  const [chip1Visible, setChip1Visible] = useState(false)
  const [chip2Visible, setChip2Visible] = useState(false)
  const [swapLabel, setSwapLabel] = useState(false)
  const [swapName, setSwapName] = useState(false)
  const [swapSub, setSwapSub] = useState(false)
  const [swapStatus, setSwapStatus] = useState(false)

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    let cancelled = false

    const swap = (setter: (v: boolean) => void, setText: (s: string) => void, text: string) => {
      setter(true)
      const t = setTimeout(() => {
        if (cancelled) return
        setText(text)
        setter(false)
      }, 300)
      timers.push(t)
    }

    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms))
    }

    const clearAll = () => {
      timers.forEach(clearTimeout)
      timers = []
    }

    const runCycle = () => {
      clearAll()
      swap(setSwapLabel, setCallerLabel, 'incoming call')
      swap(setSwapName, setCallerName, 'Unknown caller')
      swap(setSwapSub, setCallerSub, 'Mobile · +61 4XX XXX XXX')
      swap(setSwapStatus, setCallStatus, 'TalkMate is answering · 1.2s')
      setChip1Visible(false)
      setChip2Visible(false)

      schedule(() => {
        swap(setSwapLabel, setCallerLabel, 'active call')
        swap(setSwapName, setCallerName, 'Sarah · Northcote')
        swap(setSwapSub, setCallerSub, 'Mobile · +61 422 187 503')
        swap(setSwapStatus, setCallStatus, 'Booking job · Tues 14:30')
      }, 1600)

      schedule(() => setChip1Visible(true), 2600)
      schedule(() => swap(setSwapStatus, setCallStatus, 'Sending confirmation SMS…'), 3800)
      schedule(() => setChip2Visible(true), 4400)
      schedule(() => swap(setSwapStatus, setCallStatus, 'Call complete · 47s'), 6000)
      schedule(() => {
        setChip1Visible(false)
        setChip2Visible(false)
      }, 8200)
      schedule(runCycle, 9000)
    }

    const onVisibility = () => {
      if (document.hidden) {
        clearAll()
      } else {
        runCycle()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    runCycle()

    return () => {
      cancelled = true
      clearAll()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="tm-home">
      <header className="wrap" data-screen-label="Header">
        <nav className="nav">
          <a href="/" className="brand" aria-label="TalkMate home">
            <span className="brand-mark" aria-hidden="true"></span>
            <span>TalkMate</span>
          </a>

          <div className="nav-links" role="navigation">
            <a href="#included" onClick={handleAnchor}>What you get</a>
            <a href="#compare" onClick={handleAnchor}>Compare</a>
            <a href="#how" onClick={handleAnchor}>How it works</a>
            <a href="#pricing" onClick={handleAnchor}>Pricing</a>
            <a href="/industries">Industries</a>
          </div>

          <div className="nav-right">
            <a className="login" href="https://app.talkmate.com.au/login">Log in</a>
            <a className="signup" href="/trial">Free trial</a>
            <button
              className="hamburger"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              aria-controls="tm-mobile-menu"
              onClick={() => setMobileOpen(true)}
            ><i></i><i></i><i></i></button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="tm-mobile-menu"
          className="tm-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="tm-mobile-menu-head">
            <a href="/" className="brand" aria-label="TalkMate home">
              <span className="brand-mark" aria-hidden="true"></span>
              <span>TalkMate</span>
            </a>
            <button
              className="tm-mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >×</button>
          </div>
          <nav className="tm-mobile-menu-links" role="navigation">
            {[
              ['#included', 'What you get'],
              ['#compare', 'Compare'],
              ['#how', 'How it works'],
              ['#pricing', 'Pricing'],
              ['/industries', 'Industries'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { handleAnchor(e); setMobileOpen(false) }}
              >{label}</a>
            ))}
          </nav>
          <div className="tm-mobile-menu-cta">
            <a className="login" href="https://app.talkmate.com.au/login">Log in</a>
            <a
              className="signup"
              href="/trial"
              onClick={() => setMobileOpen(false)}
            >Free trial</a>
          </div>
        </div>
      )}

      <main>
        <section className="wrap hero" id="hero" data-screen-label="01 Hero">
          <section className="hero-left">
            <span className="tag-pill">
              <span className="tag-dot" aria-hidden="true"></span>
              AI front desk for busy Australian businesses
            </span>

            <h1 className="headline">
              Every call answered. <span className="accent">Every job booked.</span> Day or night.
            </h1>

            <p className="subhead">
              TalkMate is an AI front desk we build and run for you. It answers every call, books the job and puts emergencies through to your on-call team. Made for plumbers, electricians, air con and property managers with more calls than people.
            </p>

            <div className="cta-row">
              <a className="btn btn-primary" href="/trial">
                <span>Book your free 7-day trial →</span>
              </a>
              <a className="btn btn-secondary" href="#demo" onClick={handleAnchor}>Hear it answer a call</a>
            </div>

            <p className="hero-price-line">Free for 7 days, then from $299 a month. No card needed, no lock-in.</p>

            <div className="trust-row">
              <span><span className="tick">✓</span> Set up for you</span>
              <span><span className="tick">✓</span> Live in 48 hours</span>
              <span><span className="tick">✓</span> Free 7-day trial</span>
              <span><span className="tick">✓</span> Cancel anytime</span>
            </div>

            <p className="real-trust">
              Trusted by real Australian businesses including Hume Towing (Gold Coast).
            </p>

          </section>

          <section className="hero-right" aria-hidden="false">
            <div className="glow" aria-hidden="true"></div>

            <div className={`chip-float chip-1${chip1Visible ? ' visible' : ''}`}>
              <span className="chip-dot-orange"></span>
              Job booked · 14:30 Tues
            </div>
            <div className={`chip-float chip-2${chip2Visible ? ' visible' : ''}`}>
              <span className="chip-dot-blue"></span>
              SMS sent · 0.8s
            </div>

            <div className="phone" role="img" aria-label="Stylised handset showing TalkMate answering an incoming call">
              <span className="side-btn left side-action" aria-hidden="true"></span>
              <span className="side-btn left side-vol-up" aria-hidden="true"></span>
              <span className="side-btn left side-vol-down" aria-hidden="true"></span>
              <span className="side-btn right side-power" aria-hidden="true"></span>
              <span className="side-btn right side-camera" aria-hidden="true"></span>
              <div className="screen">
                <div className="status-bar">
                  <span>9:41</span>
                  <span className="right">
                    <span className="sb-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
                    <span style={{ fontWeight: 600 }}>Telstra</span>
                    <span className="sb-battery" aria-hidden="true"><i></i></span>
                  </span>
                </div>

                <div className="island" aria-hidden="true"></div>

                <p className={`incoming${swapLabel ? ' swap' : ''}`}><span>{callerLabel}</span></p>
                <p className={`caller-name${swapName ? ' swap' : ''}`}><span>{callerName}</span></p>
                <p className={`caller-sub${swapSub ? ' swap' : ''}`}><span>{callerSub}</span></p>

                <div className="avatar" aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="24" r="10" fill="currentColor" />
                    <path d="M12 56c0-11 9-18 20-18s20 7 20 18" fill="currentColor" />
                  </svg>
                </div>

                <div className="status-chip">
                  <span className="d"></span>
                  <span className={`status-chip-text${swapStatus ? ' swap' : ''}`}>{callStatus}</span>
                </div>

                <div className="wave" aria-hidden="true">
                  <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>

                <div className="call-actions">
                  <button className="call-btn decline" aria-label="Decline">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" /></svg>
                  </button>
                  <button className="call-btn answer" aria-label="TalkMate is answering">
                    <span className="answer-mark" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* 01b WHAT YOU GET (value stack) */}
        <section className="section section--light vs-section" id="included" data-screen-label="01b What you get">
          <div className="wrap">
            <p className="section-eyebrow">What you get</p>
            <h2 className="section-title">One price. <span className="accent">Everything done for you.</span></h2>
            <p className="section-sub">Every plan includes all of this. No add-ons to work out, no setup to do yourself.</p>

            <div className="vs-grid">
              {VALUE_STACK.map((v) => (
                <div className="vs-card" key={v.title}>
                  <span className="vs-icon" aria-hidden="true">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01c COMPARISON */}
        <section className="section section--light vs-section" id="compare" data-screen-label="01c Compare" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="section-eyebrow">Compare</p>
            <h2 className="section-title">Why not a cheap AI app, <span className="accent">or an answering service?</span></h2>
            <p className="section-sub">Here is what you actually get with each.</p>

            <div className="cmp-scroll">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Feature</span></th>
                    <th scope="col" className="cmp-us">TalkMate</th>
                    <th scope="col">DIY AI apps</th>
                    <th scope="col">Answering services</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(([label, us, diy, human]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td className="cmp-us">{us}</td>
                      <td>{diy}</td>
                      <td>{human}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="vs-cta">
              <a className="btn btn-primary" href="/trial"><span>Book your free 7-day trial →</span></a>
              <p>We set it up. You try it free for 7 days. Keep it only if it works for you.</p>
            </div>
          </div>
        </section>

        {/* 02 LIVE DEMO */}
        <section className="section section--demo" id="demo" data-screen-label="02 Live Demo">
          <span id="live-demo" aria-hidden="true" />
          <div className="wrap">
            <p className="section-eyebrow">Live Demo</p>
            <h2 className="section-title">Hear it answer a call. <span className="accent">Right now.</span></h2>
            <p className="section-sub">Press the button and talk to TalkMate the way your customers would. No signup, nothing to install.</p>

            <div className="role-picker">
              <button
                className={`role-chip${activeRole === 'receptionist' ? ' active' : ''}`}
                onClick={() => setActiveRole('receptionist')}
              >
                <span>Receptionist</span>
                <span className="role-chip-pill live">Live</span>
              </button>
              <button
                className={`role-chip${activeRole === 'dispatcher' ? ' active' : ''}`}
                onClick={() => setActiveRole('dispatcher')}
              >
                <span>Dispatcher</span>
                <span className="role-chip-pill live">Live</span>
              </button>
              <a className="role-chip role-chip-more" href="#team" onClick={handleAnchor}>More roles coming →</a>
            </div>

            <div className="demo-cta-wrap">
              <button
                className={`demo-cta demo-cta-state-${vapiState}`}
                onClick={handleDemoClick}
                disabled={vapiState === 'connecting'}
                aria-live="polite"
              >
                <span className="demo-cta-ico">
                  {vapiState === 'active' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  ) : (
                    '📞'
                  )}
                </span>
                <span>
                  {vapiState === 'connecting' ? 'Connecting…'
                    : vapiState === 'active' ? 'End call'
                    : vapiState === 'error' ? 'Try again'
                    : <>Talk to your <span className="demo-role-name">{activeRole}</span></>}
                </span>
                {vapiState !== 'active' && (
                  <span className="demo-wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
                )}
              </button>
            </div>

            {vapiErr && (
              <p className="demo-err" role="alert">{vapiErr}</p>
            )}

            <div className="demo-meta">
              <span><span className="tk">✓</span> Real Australian voice</span>
              <span><span className="tk">✓</span> Real-time conversation</span>
              <span><span className="tk">✓</span> Try ordering, asking, transferring</span>
            </div>
          </div>
        </section>

        {/* 04 HOW IT WORKS */}
        <section className="section" id="how" data-screen-label="04 How it works">
          <div className="wrap">
            <p className="section-eyebrow">How it works</p>
            <h2 className="section-title">Three steps. <span className="accent">Nothing for you to build.</span></h2>
            <p className="section-sub">You run your business. We set up and run your front desk.</p>

            <div className="how-grid">
              <div className="how-card">
                <p className="how-step">Step 01</p>
                <h3>Book your free trial</h3>
                <p>Tell us about your business and pick a time for a 20-minute setup call. No card needed.</p>
              </div>
              <div className="how-card">
                <p className="how-step">Step 02</p>
                <h3>We build your agent</h3>
                <p>We train it on your services, prices, hours and rules, then test it with you. Usually live within 48 hours.</p>
              </div>
              <div className="how-card">
                <p className="how-step">Step 03</p>
                <h3>Send it your calls</h3>
                <p>Forward your overflow or after-hours calls. Every call lands on your dashboard. After 7 days, keep it or walk away.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5b WHAT TALKMATE WON'T DO */}
        <section className="section section--trust" id="trust" data-screen-label="05b What we won't do">
          <div className="wrap">
            <p className="section-eyebrow">Built on trust</p>
            <h2 className="section-title">A few lines we <span className="accent">don&apos;t cross.</span></h2>
            <p className="section-sub">AI is new, and a fair bit of it is hype. Here&apos;s what TalkMate won&apos;t ever do, no matter who&apos;s asking.</p>

            <div className="trust-list">
              <div className="trust-row-item">
                <div className="trust-x" aria-hidden="true">✕</div>
                <div>
                  <h4>We won&apos;t pretend to be human.</h4>
                  <p>If a caller asks, TalkMate says it&apos;s an AI. No tricks, no fake names, no doing voices. The product works because it&apos;s good, not because the caller is fooled.</p>
                </div>
              </div>
              <div className="trust-row-item">
                <div className="trust-x" aria-hidden="true">✕</div>
                <div>
                  <h4>We won&apos;t take payment details over the phone.</h4>
                  <p>Card numbers stay between your customer and your payment provider. TalkMate sends a secure pay-link by SMS instead. Less liability for you, safer for them.</p>
                </div>
              </div>
              <div className="trust-row-item">
                <div className="trust-x" aria-hidden="true">✕</div>
                <div>
                  <h4>We won&apos;t call your customers without consent.</h4>
                  <p>Cold-calling under Australian law is a minefield, and AI doesn&apos;t get a free pass. TalkMate answers your line, sends SMS replies, follows up by email. Outbound voice only when you&apos;ve signed it off.</p>
                </div>
              </div>
              <div className="trust-row-item">
                <div className="trust-x" aria-hidden="true">✕</div>
                <div>
                  <h4>We won&apos;t lock you into a contract.</h4>
                  <p>Month-to-month. Try it free for 7 days first, then cancel anytime from the dashboard. No awkward phone call required.</p>
                </div>
              </div>
              <div className="trust-row-item">
                <div className="trust-x" aria-hidden="true">✕</div>
                <div>
                  <h4>We won&apos;t make decisions you haven&apos;t approved.</h4>
                  <p>Refunds, complaints, big-ticket quotes, anything off-script. TalkMate captures the conversation, sends it to your phone, and lets you make the call.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10b PRICING */}
        <section className="section section--pricing" id="pricing" data-screen-label="10b Pricing">
          <div className="wrap">
            <p className="section-eyebrow">One subscription</p>
            <div style={{ marginBottom: 12 }}><EofyBadge /></div>
            <h2 className="section-title">Simple, monthly. <span className="accent">No lock-in.</span></h2>
            <p className="section-sub">Try any plan free for 7 days. We set it up for you. Swap up or down anytime.</p>

            <div className="price-trust-row">
              <span><span className="tk">✓</span> Setup included</span>
              <span><span className="tk">✓</span> Free 7-day trial</span>
              <span><span className="tk">✓</span> No lock-in contracts</span>
              <span><span className="tk">✓</span> Cancel anytime</span>
            </div>

            <div className="price-grid">
              <div className="price-card">
                <p className="price-name">Starter</p>
                <div className="price-amount"><EofyWas net={299} /><strong>$299</strong><span>/month</span></div>
                <p className="price-setup">No setup fee</p>
                <p className="price-desc">For single-location businesses that want to stop missing calls and start capturing every order.</p>
                <ul className="price-bullets">
                  <li><strong>1 location</strong></li>
                  <li><strong>300 calls</strong> per month</li>
                  <li>24/7 AI receptionist</li>
                  <li>Order taking and FAQs</li>
                  <li>Upselling on every call</li>
                  <li>Live dashboard</li>
                  <li>Email support</li>
                </ul>
                <a className="price-cta" href="/trial?plan=starter">Start free trial</a>
              </div>

              <div className="price-card popular">
                <span className="price-popular-pill">Most popular</span>
                <p className="price-name">Growth</p>
                <div className="price-amount"><EofyWas net={499} /><strong>$499</strong><span>/month</span></div>
                <p className="price-setup">No setup fee</p>
                <p className="price-desc">For businesses ready to go further. All calls answered plus job scheduling, all run from the TalkMate app.</p>
                <ul className="price-bullets">
                  <li><strong>Everything in Starter</strong></li>
                  <li><strong>800 calls</strong> per month</li>
                  <li>Job scheduler with driver availability</li>
                  <li>200 booking SMS confirmations and reminders</li>
                  <li>Automated waitlist management</li>
                  <li>Live distance quoting on calls</li>
                  <li>Ask TalkMate anything in the app</li>
                  <li>50 commands per day</li>
                </ul>
                <a className="price-cta" href="/trial?plan=growth">Start free trial</a>
              </div>

              <div className="price-card">
                <p className="price-name">Pro</p>
                <div className="price-amount"><EofyWas net={799} /><strong>$799</strong><span>/month</span></div>
                <p className="price-setup">No setup fee</p>
                <p className="price-desc">Built for multi-location businesses and high-volume operators who need the lot.</p>
                <ul className="price-bullets">
                  <li><strong>Everything in Growth</strong></li>
                  <li><strong>Unlimited calls</strong></li>
                  <li>Up to 3 locations</li>
                  <li>500 booking SMS confirmations and reminders</li>
                  <li>Unlimited commands per day</li>
                  <li>Dedicated onboarding specialist</li>
                  <li>Priority phone support</li>
                </ul>
                <a className="price-cta" href="/trial?plan=pro">Start free trial</a>
              </div>
            </div>

            <p className="price-footnote">Every plan is set up for you, usually within 48 hours. Annual plans save two months, ask on your setup call. Need 4+ locations? We&apos;ll quote it on the call.</p>
          </div>
        </section>

        {/* 11 FINAL CTA */}
        <section className="section section--final" id="final" data-screen-label="11 Final CTA">
          <span id="contact" aria-hidden="true" />
          <div className="wrap">
            <h2 className="section-title">Every missed call is <span className="accent">a job for someone else.</span></h2>
            <p className="section-sub">Book a 20-minute setup call. We build your agent, you try it free for 7 days.</p>
            <div className="final-cta-row">
              <a className="btn btn-primary" href="/trial">Book your free 7-day trial →</a>
              <a className="btn btn-secondary" href="#demo" onClick={handleAnchor}>Hear it answer a call</a>
            </div>
            <p className="final-fineprint">Set up for you · Free for 7 days · No card needed</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" data-screen-label="12 Footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-brand">
              <a href="/" className="brand" aria-label="TalkMate home">
                <span className="brand-mark" aria-hidden="true"></span>
                <span>TalkMate</span>
              </a>
              <p>Australia&apos;s AI team for small business.</p>
              <p className="footer-muted">Gold Coast owned and operated.</p>
            </div>
            <div className="footer-col">
              <p className="footer-h">Product</p>
              <a href="/how-it-works">How it works</a>
              <a href="/features">Features</a>
              <a href="/pricing">Pricing</a>
              <a href="/industries">Industries</a>
            </div>
            <div className="footer-col">
              <p className="footer-h">Company</p>
              <a href="/about">About us</a>
              <a href="/partners">Partner program</a>
              <a href="/blog">Blog</a>
              <a href="/status">System status</a>
              <a href="/faq">FAQ</a>
            </div>
            <div className="footer-col">
              <p className="footer-h">Legal</p>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sla">Service Level Agreement</a>
              <a href="/privacy">Australian Privacy Act</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 TalkMate Pty Ltd · Gold Coast, QLD</p>
            <p>Built on the <span className="orange">Gold Coast</span> for Australian business.</p>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      {!stickyDismissed && (
        <div className={`sticky-cta${stickyShow ? ' show' : ''}`}>
          <p><span className="accent">Every missed call</span> is a job for someone else. Try TalkMate free for 7 days.</p>
          <div className="sticky-right">
            <a className="btn-pill" href="#included" onClick={handleAnchor}>What you get</a>
            <a className="btn-pill btn-pill-primary" href="/trial">Free trial →</a>
            <button className="sticky-close" aria-label="Dismiss" onClick={dismissSticky}>×</button>
          </div>
        </div>
      )}
    </div>
  )
}
