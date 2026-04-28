import PageHero from '@/components/PageHero'
import TwoProducts from '@/components/TwoProducts'
import FeatureRow from '@/components/FeatureRow'
import FinalCTA from '@/components/FinalCTA'
import { Phone, MessageSquare, FileText, Volume2, Zap, ShieldCheck, ListChecks, Bell, Activity, RefreshCw, CreditCard, Database, BarChart, Globe, Sparkles, Upload } from 'lucide-react'

const CORE = [
  { icon: Phone, title: 'AI Voice Agent', body: 'Answers every call in under 2 seconds. Trained on your business. Speaks your menu, your prices, your hours.', accent: '#E8622A' },
  { icon: MessageSquare, title: 'TalkMate Command', body: 'Run your business via WhatsApp or Telegram. Send invoices, update menus, query analytics, all in plain English.', accent: '#1565C0' },
  { icon: Volume2, title: 'Australian voice and accent', body: 'Real Australian voice. Customers hear someone who sounds like a local.', accent: '#22C55E' },
  { icon: ListChecks, title: 'Order & job capture', body: 'Items, quantities, addresses, vehicles, urgency. Captured perfectly every time.', accent: '#8B5CF6' },
  { icon: Bell, title: 'SMS confirmations', body: 'Customer gets a confirmation text before they hang up. Reduces no-shows by 40%.', accent: '#F59E0B' },
  { icon: FileText, title: 'Full transcripts and recordings', body: 'Every call logged with searchable transcript and audio. Flag wrong responses to retrain.', accent: '#EC4899' },
  { icon: BarChart, title: 'Live dashboard', body: 'Real-time call data, ROI counter, attributed revenue, busiest hours. Updated every second.', accent: '#06B6D4' },
  { icon: Sparkles, title: 'Upsells on every call', body: 'Suggests garlic bread, extras, premium options. Adds an average of $6.20 per order.', accent: '#E8622A' },
  { icon: Upload, title: 'AI menu import from URL', body: 'Paste your website, MenuLog, or Uber Eats URL. We scan it and pre-fill your menu in seconds.', accent: '#1565C0' },
  { icon: Zap, title: 'Live in 24 hours', body: 'Sign-up Monday, live Tuesday. No 6-week integrations. We handle everything.', accent: '#22C55E' },
]

const RELIABILITY = [
  { icon: Activity, title: 'Vapi health monitoring', body: '60-second health checks against the voice infrastructure. Auto-failover SMS to clients on any degradation.', accent: '#E8622A' },
  { icon: Phone, title: 'Daily call forwarding verification', body: 'A silent test call to your TalkMate number every morning at 9am AEST. Broken forwarding raises an alert before customers notice.', accent: '#4A9FE8' },
  { icon: CreditCard, title: 'Stripe billing redundancy', body: '15-minute Stripe sync ensures no account is ever deactivated by a webhook failure. Automatic recovery, no manual support tickets.', accent: '#22C55E' },
  { icon: Database, title: 'Daily database backups', body: 'Encrypted backups every day at 2am AEST. 30 days of point-in-time recovery on Australian servers.', accent: '#8B5CF6' },
  { icon: BarChart, title: 'Usage monitoring', body: 'Email + portal alerts at 80% and 95% of your monthly call limit. No surprises on your bill.', accent: '#F59E0B' },
  { icon: Globe, title: 'Public status page', body: 'Real-time status at status.talkmate.com.au. Up-time, incidents, and historical data, public.', accent: '#EC4899' },
]

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={<>Built for every business that <span style={{ color: 'var(--orange)' }}>takes calls</span>.</>}
        sub="Every feature exists for one reason: capture more revenue from every inbound call. No fluff, no features for features' sake."
        primary={{ label: 'Book a Free Demo', href: '/demo' }}
        secondary={{ label: 'See pricing', href: '/pricing' }}
      />

      <TwoProducts />

      <section style={{ background: 'var(--navy)' }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">Core features</div>
            <h2 className="section-h">Everything you need. <span className="orange">Nothing you don&apos;t.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
            {CORE.map(f => (
              <FeatureRow key={f.title} icon={f.icon} title={f.title} body={f.body} accent={f.accent} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--light)' }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-eyebrow">Enterprise reliability</div>
            <h2 className="section-h dark">When we say <span style={{ color: 'var(--orange)' }}>always on</span>, we mean always on.</h2>
            <p className="section-p dark" style={{ margin: '12px auto 0' }}>
              Six layers of redundancy and monitoring run 24/7 to make sure your phone never goes unanswered.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
            {RELIABILITY.map(f => (
              <FeatureRow key={f.title} icon={f.icon} title={f.title} body={f.body} accent={f.accent} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading={<>See every feature <span className="orange">in action</span>. Book a 30-minute demo.</>}
        sub="A real person, a real walk-through, an honest answer to whether TalkMate fits your business."
        primary="Book a Free Demo"
      />
    </>
  )
}
