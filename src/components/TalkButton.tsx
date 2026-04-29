'use client'
import { useEffect, useRef, useState } from 'react'

const VAPI_PUBLIC_KEY = '829a1868-99e0-4365-a86d-528752f4bbaa'
const ASSISTANT_ID = 'ca0752a1-b87b-49eb-93d7-b83ea864494c'

type VapiState = 'idle' | 'connecting' | 'active' | 'error'

export default function TalkButton() {
  const vapiRef = useRef<any>(null)
  const [state, setState] = useState<VapiState>('idle')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    let vapi: any
    import('@vapi-ai/web').then(({ default: Vapi }) => {
      vapi = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => setState('active'))
      vapi.on('call-end', () => setState('idle'))
      vapi.on('error', (e: any) => {
        console.error('Vapi error', e)
        setErrMsg('Could not connect — check mic permissions and try again.')
        setState('error')
        setTimeout(() => { setState('idle'); setErrMsg('') }, 4000)
      })
    }).catch(() => {
      console.error('Vapi SDK failed to load')
    })

    return () => {
      vapi?.stop()
    }
  }, [])

  const handleClick = async () => {
    if (!vapiRef.current) return
    if (state === 'active') {
      vapiRef.current.stop()
      setState('idle')
      return
    }
    if (state === 'connecting') return
    setState('connecting')
    try {
      await vapiRef.current.start(ASSISTANT_ID)
    } catch (e) {
      console.error(e)
      setErrMsg('Could not connect — check mic permissions and try again.')
      setState('error')
      setTimeout(() => { setState('idle'); setErrMsg('') }, 4000)
    }
  }

  const label =
    state === 'connecting' ? 'CONNECTING…' :
    state === 'active'     ? 'END CALL' :
    state === 'error'      ? 'TRY AGAIN' :
    'TALK TO TALKMATE'

  const btnBg = state === 'active' ? '#E8622A' : 'white'
  const textCol = state === 'active' ? 'white' : 'var(--navy)'
  const iconBg = state === 'active' ? 'rgba(255,255,255,0.2)' : 'var(--orange)'

  return (
    <section id="hear-it-live" style={{
      padding: '96px 32px',
      background: 'linear-gradient(135deg, rgba(21,101,192,0.06), rgba(6,19,34,0))',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="section-eyebrow">Live Demo</div>
        <h2 className="section-h">Hear it before you <span className="orange">commit</span>.</h2>
        <p className="section-p" style={{ margin: '12px auto 0' }}>
          Tap to talk to TalkMate now. No setup, no signup. Just press the button and have a conversation.
        </p>

        <button
          type="button"
          onClick={handleClick}
          disabled={state === 'connecting'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: btnBg, borderRadius: 100,
            padding: '14px 28px 14px 14px',
            cursor: state === 'connecting' ? 'wait' : 'pointer',
            border: 'none',
            margin: '32px 0 20px',
            transition: 'all 0.25s',
            fontFamily: 'Outfit, sans-serif',
            opacity: state === 'connecting' ? 0.8 : 1,
          }}
          onMouseEnter={e => {
            if (state === 'connecting') return
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <span style={{ width: 48, height: 48, background: iconBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.25s', flexShrink: 0 }}>
            {state === 'active' ? (
              /* End call icon */
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 4.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 11a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            )}
          </span>
          <span style={{ fontSize: 16, fontWeight: 800, color: textCol, letterSpacing: '0.05em', transition: 'color 0.25s', whiteSpace: 'nowrap' }}>{label}</span>
          {state !== 'active' && (
            <span style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 4 }}>
              {[8, 16, 12, 20, 10].map((h, i) => (
                <span key={i} style={{
                  width: 3, height: h, background: textCol, borderRadius: 100,
                  animation: state === 'idle' ? `wave-bar 1.2s ease-in-out infinite` : 'none',
                  animationDelay: `${i * 0.1}s`,
                  opacity: state === 'connecting' ? 0.4 : 1,
                  transition: 'background 0.25s',
                }} />
              ))}
            </span>
          )}
        </button>

        {errMsg && (
          <p style={{ fontSize: 13, color: '#F87171', marginTop: -12, marginBottom: 16 }}>{errMsg}</p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          {['Real Australian voice', 'Real-time conversation', 'Try ordering, asking, transferring'].map(t => (
            <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>✓ {t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
