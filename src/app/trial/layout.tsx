import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free 7-day trial · TalkMate',
  description: 'We build and test your AI front desk, then you try it free on your real calls for 7 days. No card needed.',
  alternates: { canonical: 'https://talkmate.com.au/trial' },
}

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return children
}
