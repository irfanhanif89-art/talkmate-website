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

const ROLES = ['receptionist', 'dispatcher', 'bookkeeper', 'sales rep', 'front desk']

const COST_DATA: Record<
  string,
  {
    label: string
    salary: string
    superC: string
    leave: string
    sick: string
    recruit: string
    humanYr: string
    tmYr: string
    compare: [string, string, string][]
  }
> = {
  receptionist: {
    label: 'receptionist',
    salary: '$65,000',
    superC: '$7,475',
    leave: '$2,500',
    sick: '$2,250',
    recruit: '$3,000 to $8,000',
    humanYr: '80,000',
    tmYr: '3,588',
    compare: [
      ['Answers calls 24/7', 'No, only during business hours', 'Yes, every call, every hour'],
      ['Never calls in sick', 'No, avg 9 sick days per year', 'Yes, 100% availability guaranteed'],
      ['Upsells every caller', 'Rarely, staff forget or feel awkward', 'Yes, every single call, without fail'],
    ],
  },
  dispatcher: {
    label: 'dispatcher',
    salary: '$72,000',
    superC: '$8,280',
    leave: '$2,800',
    sick: '$2,500',
    recruit: '$3,000 to $9,000',
    humanYr: '88,500',
    tmYr: '3,588',
    compare: [
      ['Answers the 2am breakdown call', 'On-call premium adds 25% to wages', 'Yes, every hour, every night'],
      ['Routes a job in under 30 seconds', 'Sometimes, depends on the operator', 'Yes, every single dispatch'],
      ['Confirms ETA by SMS', 'Manual, often forgotten in the rush', 'Yes, automatic, every job'],
    ],
  },
}

const fmtMoney = (n: number) => '$' + Math.round(n).toLocaleString('en-AU')
const fmtDays = (n: number) => {
  const d = Math.max(1, Math.round(n))
  return d === 1 ? '1 day' : d + ' days'
}

// `href` points to a dedicated /industries/<slug> page when one exists,
// otherwise to the /industries overview.
const PERSONAS = [
  { name: 'Bella', tag: 'Restaurants & Takeaway', initial: 'B', photo: '/personas/Bella.png', gradient: undefined, href: '/industries/restaurants', bullets: ['Takes full orders with modifications', 'Upsells sides, drinks, upgrades', 'Handles delivery zones, ETAs, dietary questions'] },
  { name: 'Troy', tag: 'Towing & Transport', initial: 'T', photo: '/personas/Troy.png', gradient: 'linear-gradient(180deg,#FFB870,#FF8A3D)', href: '/industries/towing', bullets: ['Knows to ask if a forklift is electric or gas', 'Captures vehicle make, model, year, breakdown location', 'Sends job ID and ETA confirmation via SMS'] },
  { name: 'Charlotte', tag: 'Real Estate', initial: 'C', photo: '/personas/Charlotte.png', gradient: 'linear-gradient(180deg,#F8A4C9,#E8669F)', href: '/industries/real-estate', bullets: ['Qualifies buyers on budget and pre-approval status', 'Books inspection times, sends SMS confirmations', "Handles enquiries during open homes when you can't answer"] },
  { name: 'Jake', tag: 'Trades & Services', initial: 'J', photo: '/personas/Jake.png', gradient: 'linear-gradient(180deg,#FFC861,#E8A226)', href: '/industries/trades', bullets: ['Triages emergency vs standard jobs instantly', 'Asks the right questions before booking a call-back', 'Handles pricing enquiries without committing to a quote'] },
  { name: 'Grace', tag: 'Healthcare & Clinics', initial: 'G', photo: '/personas/Grace.png', gradient: 'linear-gradient(180deg,#A4B9F8,#5B7FE0)', href: '/industries/healthcare', bullets: ['Books, reschedules, cancels appointments', 'Knows when to transfer urgent calls immediately', 'Handles new vs existing patient enquiries correctly'] },
  { name: 'Sophie', tag: 'NDIS Providers', initial: 'S', photo: '/personas/Sophie.png', gradient: 'linear-gradient(180deg,#80E7C8,#2DD4A0)', href: '/industries/ndis', bullets: ['Handles participant and support coordinator calls with care', 'Asks about support type and funding category', 'Always responds with patience and empathy'] },
  { name: 'Mia', tag: 'Retail', initial: 'M', photo: '/personas/Mia.png', gradient: 'linear-gradient(180deg,#F89BB6,#D85A89)', href: '/industries/retail', bullets: ['Handles stock enquiries by size, colour, availability', 'Takes layby requests and special orders', 'Answers hours, location, and online order questions'] },
  { name: 'James', tag: 'Professional Services', initial: 'J', photo: '/personas/James.png', gradient: 'linear-gradient(180deg,#8CC0F5,#5B95DB)', href: '/industries/professional-services', bullets: ['Qualifies new enquiries by matter type before they reach you', 'Books consultations without giving legal or financial advice', 'Takes detailed messages for urgent matters'] },
  { name: 'Olivia', tag: 'Hospitality & Hotels', initial: 'O', photo: '/personas/Olivia.png', gradient: 'linear-gradient(180deg,#D6A8F5,#9A5BDB)', href: '/industries', bullets: ['Takes room enquiries, reservations, function bookings', 'Asks party size, dates, and special requests automatically', 'Handles cancellations professionally'] },
  { name: 'Mitch', tag: 'Automotive', initial: 'M', photo: '/personas/Mitch.png', gradient: 'linear-gradient(180deg,#F8A56B,#D8693C)', href: '/industries', bullets: ['Books logbook services, roadworthys, repairs', 'Asks vehicle make, model, year, kilometre reading', 'Handles parts enquiries and service pricing questions'] },
  { name: 'Zara', tag: 'Beauty & Wellness', initial: 'Z', photo: '/personas/Zara.png', gradient: 'linear-gradient(180deg,#F87CA0,#D43F70)', href: '/industries', bullets: ['Books appointments by service type and preferred therapist', 'Knows treatment durations for accurate scheduling', 'Handles cancellation policy questions'] },
  { name: 'Ryan', tag: 'Fitness & Gyms', initial: 'R', photo: '/personas/Ryan.png', gradient: 'linear-gradient(180deg,#9CE8C6,#3BB58A)', href: '/industries', bullets: ['Handles membership enquiries and class bookings', 'Books intro sessions and personal training consultations', 'Handles cancellation and freeze requests'] },
  { name: 'Lily', tag: 'Education & Tutoring', initial: 'L', photo: '/personas/Lily.png', gradient: 'linear-gradient(180deg,#FFC861,#E8A226)', href: '/industries', bullets: ['Handles enrolment enquiries and books trial lessons', 'Asks for student year level and subjects needed', 'Takes parent contact details for follow-up'] },
]

export default function HomePage() {
  // ----- role rotator -----
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleClass, setRoleClass] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleClass('out')
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setRoleClass('in')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setRoleClass(''))
        })
      }, 280)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

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

  // ----- cost comparison tabs -----
  const [costRole, setCostRole] = useState<'receptionist' | 'dispatcher'>('receptionist')
  const costData = COST_DATA[costRole]

  // ----- revenue calculator -----
  const [missed, setMissed] = useState(8)
  const [conv, setConv] = useState(50)
  const [order, setOrder] = useState(45)
  const [callVol, setCallVol] = useState(40)

  // keep callVol >= missed
  useEffect(() => {
    if (callVol < missed) setCallVol(missed)
  }, [missed, callVol])

  const stake = missed * 30 * order
  const captured = stake * (conv / 100)
  const upsellPer = Math.max(8, order * 0.3)
  const answered = Math.max(0, callVol - missed)
  const upsell = answered * 30 * upsellPer * 0.4
  const realistic = captured + upsell
  const paybackDays = 299 / Math.max(1, realistic / 30)

  // ----- animated number tweening -----
  const stakeNumRef = useRef<HTMLParagraphElement | null>(null)
  const monthNumRef = useRef<HTMLParagraphElement | null>(null)
  const paybackNumRef = useRef<HTMLParagraphElement | null>(null)
  const tweensRef = useRef<Map<HTMLElement, number>>(new Map())

  const animateNumber = (el: HTMLElement | null, to: number, formatter: (n: number) => string, duration = 280) => {
    if (!el) return
    const from = Number(el.dataset.cur || 0)
    const prev = tweensRef.current.get(el)
    if (prev) cancelAnimationFrame(prev)
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const v = from + (to - from) * eased
      el.textContent = formatter(v)
      if (t < 1) {
        tweensRef.current.set(el, requestAnimationFrame(step))
      } else {
        el.dataset.cur = String(to)
        tweensRef.current.delete(el)
      }
    }
    tweensRef.current.set(el, requestAnimationFrame(step))
  }

  useEffect(() => {
    animateNumber(stakeNumRef.current, stake, fmtMoney)
    animateNumber(monthNumRef.current, realistic, fmtMoney)
    animateNumber(paybackNumRef.current, paybackDays, fmtDays)
  }, [stake, realistic, paybackDays])

  // ----- slider fills -----
  const fillStyle = (v: number, min: number, max: number) => ({
    ['--fill' as never]: `${((v - min) / (max - min)) * 100}%`,
  })

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

  const calls = `${missed} ${missed === 1 ? 'call' : 'calls'}`

  return (
    <div className="tm-home">
      <header className="wrap" data-screen-label="Header">
        <nav className="nav">
          <a href="/" className="brand" aria-label="TalkMate home">
            <span className="brand-mark" aria-hidden="true"></span>
            <span>TalkMate</span>
          </a>

          <div className="nav-links" role="navigation">
            <a href="#how" onClick={handleAnchor}>How it works</a>
            <a href="#team" onClick={handleAnchor}>The team</a>
            <a href="#pricing" onClick={handleAnchor}>Pricing</a>
            <a href="#calc" onClick={handleAnchor}>ROI</a>
            <a href="#industries" onClick={handleAnchor}>Industries</a>
            <a href="#crm" onClick={handleAnchor}>CRM</a>
          </div>

          <div className="nav-right">
            <a className="login" href="https://app.talkmate.com.au/login">Log in</a>
            <a className="signup" href="https://app.talkmate.com.au/signup">Sign Up</a>
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
              ['#how', 'How it works'],
              ['#team', 'The team'],
              ['#pricing', 'Pricing'],
              ['#calc', 'ROI'],
              ['#industries', 'Industries'],
              ['#crm', 'CRM'],
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
              href="https://app.talkmate.com.au/signup"
              onClick={() => setMobileOpen(false)}
            >Sign Up</a>
          </div>
        </div>
      )}

      <main>
        <section className="wrap hero" id="hero" data-screen-label="01 Hero">
          <section className="hero-left">
            <span className="tag-pill">
              <span className="tag-dot" aria-hidden="true"></span>
              Australia&apos;s AI Employees · Made in Australia
            </span>

            <h1 className="headline">
              Every <span className="accent">missed call</span> is a customer going elsewhere.
            </h1>

            <p className="subhead">
              TalkMate is your AI{' '}
              <span className="role-rotator" aria-live="polite">
                <span className={`role-word ${roleClass}`}>{ROLES[roleIndex]}</span>
              </span>
              , on the job 24/7 from $299/month. Answers calls, books jobs, dispatches drivers, chases invoices, follows up leads. Live in 24 hours. Made in Australia.
            </p>

            <p className="hero-roi-line">
              See exactly what TalkMate makes you, tracked in real time.
            </p>

            <div className="cta-row">
              <a className="btn btn-primary" href="https://app.talkmate.com.au/signup">
                <span>Hire your AI team →</span>
              </a>
              <a className="btn btn-secondary" href="#pricing" onClick={handleAnchor}>See pricing</a>
            </div>

            <div className="trust-row">
              <span><span className="tick">✓</span> Setup included</span>
              <span><span className="tick">✓</span> Live in 24 hours</span>
              <span><span className="tick">✓</span> 14-day money back</span>
              <span><span className="tick">✓</span> Cancel anytime</span>
            </div>

            <p className="real-trust">
              Trusted by real Australian businesses including Burleigh British Chippery (Gold Coast) and Hume Towing (Gold Coast).
            </p>

            <p className="hero-roi-stat">
              Australian businesses have recovered <span>$127,000</span> in missed revenue with TalkMate.
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

        {/* 02 LIVE DEMO */}
        <section className="section section--demo" id="demo" data-screen-label="02 Live Demo">
          <span id="live-demo" aria-hidden="true" />
          <div className="wrap">
            <p className="section-eyebrow">Live Demo</p>
            <h2 className="section-title">Hear any of your team <span className="accent">before you hire them.</span></h2>
            <p className="section-sub">Tap to talk to TalkMate now. No setup, no signup. Pick a role, press the button, have a real conversation.</p>

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

        {/* 03 COST COMPARISON */}
        <section className="section section--light" id="value" data-screen-label="03 Cost Comparison">
          <div className="wrap">
            <p className="section-eyebrow">The smartest hire you&apos;ll ever make</p>
            <h2 className="section-title">
              Your {costData.label} costs $<span>{costData.tmYr}</span> a year. <span className="accent">Not $<span>{costData.humanYr}</span>.</span>
            </h2>
            <p className="section-sub">
              The average Australian {costData.label} costs over $<span>{costData.humanYr}</span> per year when you include super, leave, and on-costs. TalkMate costs $299 a month. Here&apos;s the full breakdown.
            </p>

            <div className="cost-tabs" role="tablist">
              <button
                className={`cost-tab${costRole === 'receptionist' ? ' active' : ''}`}
                onClick={() => setCostRole('receptionist')}
              >Receptionist</button>
              <button
                className={`cost-tab${costRole === 'dispatcher' ? ' active' : ''}`}
                onClick={() => setCostRole('dispatcher')}
              >Dispatcher</button>
              <button className="cost-tab disabled" disabled>Bookkeeper · Soon</button>
              <button className="cost-tab disabled" disabled>Sales rep · Soon</button>
            </div>

            <div className="cost-table">
              <div className="cost-row cost-row-head">
                <div>&nbsp;</div>
                <div>Human {costData.label}</div>
                <div>TalkMate</div>
              </div>
              <div className="cost-row">
                <div>Annual salary</div>
                <div>{costData.salary}</div>
                <div className="cost-zero">$0</div>
              </div>
              <div className="cost-row">
                <div>Superannuation (11.5%)</div>
                <div>{costData.superC}</div>
                <div className="cost-zero">$0</div>
              </div>
              <div className="cost-row">
                <div>Annual leave loading</div>
                <div>{costData.leave}</div>
                <div className="cost-zero">$0</div>
              </div>
              <div className="cost-row">
                <div>Sick days (avg 9/yr)</div>
                <div>{costData.sick}</div>
                <div className="cost-zero">$0</div>
              </div>
              <div className="cost-row">
                <div>Recruitment cost</div>
                <div>{costData.recruit}</div>
                <div className="cost-zero">$0</div>
              </div>
              <div className="cost-row cost-row-total">
                <div>Total real cost</div>
                <div>~${costData.humanYr}+</div>
                <div className="cost-accent">${costData.tmYr}/yr</div>
              </div>
            </div>

            <div className="cost-compare-list">
              {costData.compare.map((row, i) => (
                <div className="cost-compare-row" key={i}>
                  <div>{row[0]}</div>
                  <div className="cross">{row[1]}</div>
                  <div className="check">{row[2]}</div>
                </div>
              ))}
            </div>

            <p className="cost-fineprint">
              Salary data based on SEEK and Hays Australia 2026 averages for {costData.label} roles. On-costs include superannuation at <span className="lit">11.5%</span>, average annual leave loading, and average sick leave at current rates.
            </p>

            <div className="cost-cta-wrap">
              <a className="btn btn-primary" href="https://app.talkmate.com.au/signup">Get your {costData.label} for $299/mo</a>
            </div>
          </div>
        </section>

        {/* 04 HOW IT WORKS */}
        <section className="section section--light" id="how" data-screen-label="04 How it works" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <p className="section-eyebrow">How it works</p>
            <h2 className="section-title">Three steps. <span className="accent">One missed call becomes a sale.</span></h2>
            <p className="section-sub">From the moment your phone rings, TalkMate has already answered, captured the order, and sent the confirmation.</p>

            <div className="how-grid">
              <div className="how-card">
                <p className="how-step">Step 01</p>
                <h3>Customer calls your number</h3>
                <p>Forward your existing business number to your TalkMate line, or use a fresh dedicated number we provide. TalkMate answers in under 2 seconds, every time.</p>
              </div>
              <div className="how-card">
                <p className="how-step">Step 02</p>
                <h3>Your employee takes the call</h3>
                <p>TalkMate is trained on your business. Whichever employee answers, receptionist, dispatcher, or another role, they know your menu, prices, run sheet. They upsell, capture details, and transfer to you when it matters.</p>
              </div>
              <div className="how-card">
                <p className="how-step">Step 03</p>
                <h3>SMS confirmation and dashboard logging</h3>
                <p>Every customer gets an SMS confirmation within seconds. Every call lands in your dashboard with a transcript, recording, and outcome tag. Ready to action.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 MEET THE TEAM */}
        <section className="section" id="team" data-screen-label="05 Meet the team">
          <span id="meet-your-receptionist" aria-hidden="true" />
          <div className="wrap">
            <p className="section-eyebrow">Meet the team</p>
            <h2 className="section-title">Your AI <span className="accent">team.</span> Hire one, hire all.</h2>
            <p className="section-sub">Each employee is a specialist. They share the same brain about your business, and they hand off cleanly. Start with one. Add more as you grow.</p>

            <div className="team-grid team-grid-pair">
              <article className="team-card team-card-live">
                <div className="team-card-top">
                  <div className="team-avatar" data-initial="R">
                    <img src="/personas/Olivia.png" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <span className="team-badge live">● Live</span>
                </div>
                <h3>The Receptionist</h3>
                <p className="team-tag">The one who never misses a call</p>
                <p className="team-desc">Answers every ring, takes orders, books jobs, qualifies leads, sends SMS confirmations.</p>
                <ul className="team-bullets">
                  <li>Handles 100+ calls a day without breaking a sweat</li>
                  <li>Trained on your menu, prices, hours, and FAQs</li>
                  <li>Transfers to you when it matters</li>
                </ul>
                <a className="team-cta" href="#demo" onClick={handleAnchor}>Try the receptionist →</a>
              </article>

              <article className="team-card team-card-live">
                <div className="team-card-top">
                  <div className="team-avatar" data-initial="D">
                    <img src="/personas/Troy.png" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <span className="team-badge live">● Live</span>
                </div>
                <h3>The Dispatcher</h3>
                <p className="team-tag">The one who keeps the wheels turning</p>
                <p className="team-desc">Routes drivers, confirms ETAs, manages the run sheet, fields the breakdown call at 11pm.</p>
                <ul className="team-bullets">
                  <li>Triages emergency vs standard jobs in under 30 seconds</li>
                  <li>Confirms ETAs by SMS so the customer isn&apos;t left wondering</li>
                  <li>Pushes the next job to the next available driver</li>
                </ul>
                <a className="team-cta" href="#demo" onClick={handleAnchor}>Try the dispatcher →</a>
              </article>
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
                  <p>Month-to-month. Cancel anytime from the dashboard. 14-day money-back if it&apos;s not a fit, no awkward phone call required.</p>
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

        {/* 06 REVENUE CALCULATOR */}
        <section className="section" id="calc" data-screen-label="06 Revenue Calculator">
          <div className="wrap">
            <p className="section-eyebrow">Revenue Calculator</p>
            <h2 className="section-title">See what TalkMate <span className="accent">recovers</span> for you.</h2>
            <p className="section-sub">Four sliders, real numbers, no spreadsheet required. The conversion-rate slider keeps the maths honest.</p>

            <div className="calc-card">
              <div className="calc-sliders">
                <div className="calc-slider">
                  <div className="calc-slider-head"><span>Calls you miss each day</span><strong>{calls}</strong></div>
                  <input
                    type="range" min={1} max={40} value={missed}
                    onChange={(e) => setMissed(Number(e.target.value))}
                    style={fillStyle(missed, 1, 40)}
                    aria-label="Calls missed each day"
                  />
                </div>
                <div className="calc-slider">
                  <div className="calc-slider-head"><span>% of missed callers who would have bought</span><strong>{conv}%</strong></div>
                  <input
                    type="range" min={10} max={100} step={5} value={conv}
                    onChange={(e) => setConv(Number(e.target.value))}
                    style={fillStyle(conv, 10, 100)}
                    aria-label="Conversion rate"
                  />
                </div>
                <div className="calc-slider">
                  <div className="calc-slider-head"><span>Average order or job value</span><strong>${order}</strong></div>
                  <input
                    type="range" min={10} max={500} value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    style={fillStyle(order, 10, 500)}
                    aria-label="Average order value"
                  />
                </div>
                <div className="calc-slider">
                  <div className="calc-slider-head"><span>Total daily call volume</span><strong>{callVol} calls</strong></div>
                  <input
                    type="range" min={10} max={200} value={callVol}
                    onChange={(e) => setCallVol(Number(e.target.value))}
                    style={fillStyle(callVol, 10, 200)}
                    aria-label="Daily call volume"
                  />
                </div>
              </div>
              <div className="calc-outputs">
                <div className="calc-output">
                  <p className="calc-label">Revenue at stake each month</p>
                  <p className="calc-num calc-muted-num" ref={stakeNumRef}>{fmtMoney(stake)}</p>
                  <p className="calc-sub">Gross missed-call value before conversion</p>
                </div>
                <div className="calc-output">
                  <p className="calc-label">Realistically recovered each month</p>
                  <p className="calc-num calc-orange" ref={monthNumRef}>{fmtMoney(realistic)}</p>
                  <p className="calc-sub">After {conv}% conversion · includes upsell on answered calls</p>
                </div>
                <div className="calc-output">
                  <p className="calc-label">Pays for itself in</p>
                  <p className="calc-num calc-green" ref={paybackNumRef}>{fmtDays(paybackDays)}</p>
                  <p className="calc-sub">Starter plan, $299/mo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 POCKET CONTROL PANEL */}
        <section className="section" id="panel" data-screen-label="07 Control Panel">
          <div className="wrap">
            <p className="section-eyebrow">Your control panel</p>
            <h2 className="section-title">Everything in one place. <span className="accent-blue">Always in your pocket.</span></h2>
            <p className="section-sub">Real-time call data, ROI counter, transcripts, command history, billing. Designed for the way you actually run a business.</p>

            <div className="panel-mockup">
              <div className="panel-cards">
                <div className="panel-card panel-card-rev">
                  <p className="panel-card-label">Est. revenue protected by TalkMate</p>
                  <p className="panel-card-big">$4,287</p>
                  <p className="panel-card-sub">This month · Updated daily</p>
                </div>
                <div className="panel-stat-row">
                  <div className="panel-stat"><p>Calls today</p><strong>34</strong></div>
                  <div className="panel-stat"><p>Revenue captured</p><strong>$8,420</strong></div>
                  <div className="panel-stat"><p>Answer rate</p><strong>100%</strong></div>
                  <div className="panel-stat"><p>Avg upsell</p><strong>+$6.20</strong></div>
                </div>
              </div>
              <div className="panel-cards">
                <div className="panel-card panel-card-cmd">
                  <p className="panel-card-label panel-card-label-blue">Control centre</p>
                  <p className="panel-card-big">Team connected</p>
                  <p className="panel-card-sub">2 employees live · 4 in beta</p>
                </div>
                <div className="panel-cmd-list">
                  <p className="panel-cmd-label">Today&apos;s commands</p>
                  <div className="panel-cmd"><span>&ldquo;How many calls today?&rdquo;</span><span className="panel-cmd-pill ok">Success</span></div>
                  <div className="panel-cmd"><span>&ldquo;Pause receptionist for 1hr&rdquo;</span><span className="panel-cmd-pill ok">Success</span></div>
                  <div className="panel-cmd"><span>&ldquo;Send invoice to Mike for $380&rdquo;</span><span className="panel-cmd-pill pending">Pending</span></div>
                  <div className="panel-cmd"><span>&ldquo;Find Christina from Melbourne&rdquo;</span><span className="panel-cmd-pill ok">Success</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 AUTO-CRM */}
        <section className="section" id="crm" data-screen-label="08 Auto-CRM">
          <div className="wrap">
            <p className="section-eyebrow">Built-in CRM</p>
            <h2 className="section-title">Your business builds a CRM. <span className="accent">Automatically.</span></h2>
            <p className="section-sub">Every call your team answers adds a contact to your database. No forms. No data entry. Just calls turning into an intelligent contact list over time.</p>

            <div className="crm-grid">
              <div className="crm-card">
                <h3>Contacts built from calls</h3>
                <p>Every unique caller becomes a contact with their name, history, and what they asked about. No forms, no manual data entry, no spreadsheets.</p>
              </div>
              <div className="crm-card">
                <h3>Smart lists that update themselves</h3>
                <p>Regulars, lapsed customers, complaints, hot leads. Filtered lists that stay current automatically as TalkMate captures new calls.</p>
              </div>
              <div className="crm-card">
                <h3>Query from anywhere</h3>
                <p>Ask your TalkMate team &ldquo;who are my top callers?&rdquo; or &ldquo;find Christina from Melbourne&rdquo; while you&apos;re driving. Your CRM in your pocket.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 09 INTEGRATIONS */}
        <section className="section section--integ section--light" id="integrations" data-screen-label="09 Integrations">
          <div className="wrap">
            <p className="section-eyebrow">Plays nicely with your existing tools</p>
          </div>
          <div className="integ-marquee" aria-label="Integration partners">
            <div className="integ-track">
              {[0, 1].map((set) => (
                <div key={set} style={{ display: 'contents' }} aria-hidden={set === 1 ? true : undefined}>
                  <div className="integ-logo"><span className="integ-mark ms" aria-hidden="true">M365</span>Microsoft 365</div>
                  <div className="integ-logo"><span className="integ-mark slack" aria-hidden="true">#</span>Slack</div>
                  <div className="integ-logo"><span className="integ-mark zapier" aria-hidden="true">⚡</span>Zapier</div>
                  <div className="integ-logo"><span className="integ-mark stripe" aria-hidden="true">S</span>Stripe</div>
                  <div className="integ-logo"><span className="integ-mark gcal" aria-hidden="true">G</span>Google Calendar</div>
                  <div className="integ-logo"><span className="integ-mark xero" aria-hidden="true">X</span>Xero</div>
                  <div className="integ-logo"><span className="integ-mark myob" aria-hidden="true">MYOB</span>MYOB</div>
                  <div className="integ-logo"><span className="integ-mark hubspot" aria-hidden="true">H</span>HubSpot</div>
                  <div className="integ-logo"><span className="integ-mark quickbooks" aria-hidden="true">qb</span>QuickBooks</div>
                  <div className="integ-logo"><span className="integ-mark gmail" aria-hidden="true">M</span>Gmail</div>
                  <div className="integ-logo"><span className="integ-mark twilio" aria-hidden="true">T</span>Twilio</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09b NEW FEATURES — Sprint Session 1 */}
        <section className="section" id="customer-care" data-screen-label="09b Customer care">
          <div className="wrap">
            <p className="section-eyebrow">Customer care, automated</p>
            <h2 className="section-title">Catch every lead. <span className="accent">Earn every review.</span></h2>
            <p className="section-sub">Four features that make sure no caller falls through the cracks, and every happy customer becomes a 5-star review.</p>

            <div className="crm-grid">
              <div className="crm-card">
                <h3>Two-way SMS Inbox</h3>
                <p>Manage every customer text from one place. Reply instantly, let AI suggest responses, and never lose a lead in a text thread.</p>
              </div>
              <div className="crm-card">
                <h3>Train TalkMate</h3>
                <p>Teach TalkMate exactly how to represent your business. Add FAQs, services, pricing, and team info. Changes go live in seconds.</p>
              </div>
              <div className="crm-card">
                <h3>Missed Call Win-back</h3>
                <p>When a caller hangs up before TalkMate answers, it automatically texts them back within 90 seconds. No lead left behind.</p>
              </div>
              <div className="crm-card">
                <h3>Google Review Requests</h3>
                <p>After every job, TalkMate automatically asks for a Google review. More 5-star reviews on autopilot.</p>
              </div>
              <div className="crm-card">
                <h3>AI Website Chatbot</h3>
                <p>A chatbot on your website that knows your business inside out. Answers questions, captures leads, and hands off to your TalkMate agent when they call.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 09c SETUP & CONTROL — Session 4A */}
        <section className="section section--light" id="setup-control" data-screen-label="09c Setup and control">
          <div className="wrap">
            <p className="section-eyebrow">Set up in minutes, in full control</p>
            <h2 className="section-title">Live before lunch. <span className="accent">On your terms.</span></h2>
            <p className="section-sub">Get your AI assistant up and running fast, give her your name and voice, and hand over the calls at the pace that suits you.</p>

            <div className="crm-grid">
              <div className="crm-card">
                <h3>Smart Setup</h3>
                <p>Paste your Google Business Profile link. TalkMate finds your business, reads your website, and pre-fills your entire knowledge base automatically. Live in under 5 minutes.</p>
              </div>
              <div className="crm-card">
                <h3>Overflow Mode</h3>
                <p>Not ready to hand over all your calls? Start with overflow mode. Your phone rings as normal. TalkMate only answers when you can&apos;t.</p>
              </div>
              <div className="crm-card">
                <h3>Your Agent, Your Name</h3>
                <p>Name your AI assistant and choose her voice. She introduces herself as your assistant, not a generic bot. Your regulars won&apos;t be confused.</p>
              </div>
              <div className="crm-card">
                <h3>Always Ready to Transfer</h3>
                <p>When callers ask for you personally, your agent says your name and makes sure they feel looked after, even when you&apos;re on another job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10 INDUSTRY PERSONA GRID */}
        <section className="section" id="industries" data-screen-label="10 Industries">
          <div className="wrap">
            <p className="section-eyebrow">Meet your employee</p>
            <h2 className="section-title">Trained for your industry. <span className="accent-blue">Ready in 24 hours.</span></h2>
            <p className="section-sub">Every TalkMate employee knows your industry inside out. They ask the right questions, use the right terminology, and handle calls exactly the way your business needs.</p>

            <div className="ind-grid">
              {PERSONAS.map((p) => (
                <article className="ind-card" key={p.name}>
                  <div className="ind-avatar" style={p.gradient ? { background: p.gradient } : undefined}>
                    {p.initial}
                    <img src={p.photo} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <div className="ind-body">
                    <h4>{p.name}</h4>
                    <span className="ind-tag">{p.tag}</span>
                    <ul>
                      {p.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                    </ul>
                    <a className="ind-link" href={p.href}>View full profile →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10b PRICING */}
        <section className="section section--pricing" id="pricing" data-screen-label="10b Pricing">
          <div className="wrap">
            <p className="section-eyebrow">One subscription</p>
            <div style={{ marginBottom: 12 }}><EofyBadge /></div>
            <h2 className="section-title">Simple, monthly. <span className="accent">No lock-in.</span></h2>
            <p className="section-sub">Most clients break even within their first week. Pick a tier, swap up or down anytime.</p>

            <div className="price-trust-row">
              <span><span className="tk">✓</span> Setup included</span>
              <span><span className="tk">✓</span> 14-day money-back</span>
              <span><span className="tk">✓</span> No lock-in contracts</span>
              <span><span className="tk">✓</span> Cancel anytime</span>
            </div>

            <div className="price-grid">
              <div className="price-card">
                <p className="price-name">Starter</p>
                <div className="price-amount"><EofyWas net={299} /><strong>$299</strong><span>/month</span></div>
                <p className="price-setup">One-off setup fee: $299</p>
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
                <a className="price-cta" href="https://app.talkmate.com.au/signup?plan=starter">Choose Starter</a>
              </div>

              <div className="price-card popular">
                <span className="price-popular-pill">Most popular</span>
                <p className="price-name">Growth</p>
                <div className="price-amount"><EofyWas net={499} /><strong>$499</strong><span>/month</span></div>
                <p className="price-setup">One-off setup fee: $349</p>
                <p className="price-desc">For businesses ready to go further. All calls answered plus job scheduling and Telegram commands.</p>
                <ul className="price-bullets">
                  <li><strong>Everything in Starter</strong></li>
                  <li><strong>800 calls</strong> per month</li>
                  <li>Job scheduler with driver availability</li>
                  <li>200 booking SMS confirmations and reminders</li>
                  <li>Automated waitlist management</li>
                  <li>Live distance quoting on calls</li>
                  <li>TalkMate Command via Telegram</li>
                  <li>50 commands per day</li>
                </ul>
                <a className="price-cta" href="https://app.talkmate.com.au/signup?plan=growth">Choose Growth</a>
              </div>

              <div className="price-card">
                <p className="price-name">Pro</p>
                <div className="price-amount"><EofyWas net={799} /><strong>$799</strong><span>/month</span></div>
                <p className="price-setup">One-off setup fee: $399</p>
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
                <a className="price-cta" href="https://app.talkmate.com.au/signup?plan=pro">Choose Pro</a>
              </div>
            </div>

            <p className="price-footnote">All plans live in 24 hours. Annual plans save two months · ask the team. Need a custom quote for 4+ locations? Hit reply to your onboarding email.</p>
          </div>
        </section>

        {/* 11 FINAL CTA */}
        <section className="section section--final" id="final" data-screen-label="11 Final CTA">
          <span id="contact" aria-hidden="true" />
          <div className="wrap">
            <h2 className="section-title">Every day you wait is <span className="accent">revenue left behind.</span></h2>
            <p className="section-sub">The average TalkMate client recovers $4,200 in missed orders in their first month. Setup takes 24 hours. We handle everything.</p>
            <div className="final-cta-row">
              <a className="btn btn-primary" href="https://app.talkmate.com.au/signup">Hire your AI team →</a>
              <a className="btn btn-secondary" href="#pricing" onClick={handleAnchor}>See pricing</a>
            </div>
            <p className="final-fineprint">Live in 24 hours · 14-day money-back guarantee</p>
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
          <p><span className="accent">Every missed call</span> costs you money. TalkMate fixes that in 24 hours.</p>
          <div className="sticky-right">
            <a className="btn-pill" href="#how" onClick={handleAnchor}>Learn more</a>
            <a className="btn-pill btn-pill-primary" href="https://app.talkmate.com.au/signup">Sign Up →</a>
            <button className="sticky-close" aria-label="Dismiss" onClick={dismissSticky}>×</button>
          </div>
        </div>
      )}
    </div>
  )
}
