import PageHero from '@/components/PageHero'

// Full Privacy Policy v3.1-2026-06. Source of truth: portal lib/legal-docs.ts —
// the same text clients sign during onboarding. Keep these two in sync.
// v3.1 adds: mobile-application data (push tokens / device type), in-app
// account deletion with a 30-day purge, social-account revocation, and Expo
// as a sub-processor. Written to satisfy Apple App Store Review Guideline 5.1.

export const metadata = {
  title: 'Privacy Policy · TalkMate',
  description: 'How TalkMate collects, uses, and protects your data across our website, portal, and mobile apps. Privacy Act 1988 (Cth) compliant. Version 3.1, June 2026.',
}

const SECTIONS: Array<{ heading: string; body: string }> = [
  {
    heading: '1. Introduction',
    body: 'TalkMate Pty Ltd is committed to protecting personal information in accordance with the Australian Privacy Act 1988. This policy explains how we collect, use, store, and disclose personal information.\nThis policy applies to the TalkMate website (talkmate.com.au), the TalkMate web portal, and the TalkMate mobile applications for iOS and Android.',
  },
  {
    heading: '2. Information we collect about you (the business owner)',
    body: '2.1 Account information: your name, business name, email address, phone number, and billing details when you create an account.\n2.2 Usage data: how you use the TalkMate portal and mobile app, which features you access, and when.\n2.3 Payment information: processed and stored by Stripe. TalkMate does not store credit card numbers.\n2.4 Mobile application data: when you use the TalkMate mobile app and grant notification permission, we collect a push notification token so we can alert you about calls, messages, and bookings, and basic device type information (for example, whether your device is iOS or Android) so notifications are delivered correctly. The TalkMate app does not collect advertising identifiers, does not track you across other apps or websites, and contains no third-party advertising or analytics software. You can turn notifications off at any time in your device settings.',
  },
  {
    heading: '3. Information we process on your behalf (caller data)',
    body: '3.1 When your customers call your TalkMate-powered number, we process their call on your behalf.\n3.2 This may include their phone number, name if provided during the call, the content of their conversation with TalkMate, and any details they provide such as addresses, preferences, or enquiry details.\n3.3 This data belongs to you. You are the data controller. TalkMate is the data processor. See our Data Processing Agreement for full details.\n3.4 We do not use your customers\' data for any purpose other than providing the TalkMate service to you.',
  },
  {
    heading: '4. Social media message data',
    body: '4.1 Where your subscription plan includes Social DM Nurture and you have connected your Instagram Business Account or Facebook Business Page, TalkMate receives and stores direct message conversations sent to those accounts.\n4.2 Data collected from social media messages may include: the sender\'s Meta user ID, name, username or handle, profile picture URL, message content, media attachments, and message timestamps.\n4.3 This data is collected on your behalf and belongs to you. You are the data controller. TalkMate processes it only to provide the Social DM Nurture service.\n4.4 Social media message data is stored on servers located in Australia (Supabase, AWS ap-southeast-2, Sydney).\n4.5 TalkMate uses social message content to generate AI responses to leads on your behalf, to create and update contact records in your TalkMate CRM, and to provide you with conversation analytics in your portal.\n4.6 Social media message data is retained for 12 months from the date of the conversation, then automatically deleted.\n4.7 You may request deletion of your social media message data at any time by contacting hello@talkmate.com.au.\n4.8 You are responsible for ensuring that your use of automated responses via TalkMate\'s Social DM Nurture feature complies with Meta\'s Messaging Platform Policies and any applicable Australian laws regarding automated communications.\n4.9 You may revoke TalkMate\'s access to your social accounts at any time by disconnecting them from your portal settings or from within Meta\'s own app settings. On disconnection TalkMate immediately stops receiving new messages from those accounts.',
  },
  {
    heading: '5. How we use your information',
    body: '5.1 To provide and improve the TalkMate service.\n5.2 To process your subscription payments.\n5.3 To send you service-related communications including usage alerts and product updates.\n5.4 To provide customer support.',
  },
  {
    heading: '6. Data storage and security',
    body: '6.1 All data is stored on servers located in Australia.\n6.2 Data is encrypted in transit using TLS and at rest.\n6.3 Access to your data is restricted to TalkMate staff who need it to provide support.\n6.4 Social media platform access tokens are encrypted using AES-256-GCM encryption and are never logged or exposed in plaintext.',
  },
  {
    heading: '7. Data retention',
    body: '7.1 Your account data is retained for the duration of your subscription and deleted within 30 days of account closure on request.\n7.2 Call recordings are retained for 90 days by default. Adjustable in account settings.\n7.3 Contact records and call transcripts are retained for the duration of your subscription.\n7.4 Social media message data is retained for 12 months and then automatically deleted.',
  },
  {
    heading: '8. Your rights',
    body: '8.1 You have the right to access the personal information TalkMate holds about you.\n8.2 You have the right to request correction of inaccurate information.\n8.3 You have the right to request deletion of your data subject to legal retention requirements.\n8.4 You can export all your contact data at any time from your portal settings.\n8.5 To exercise these rights contact hello@talkmate.com.au.\n8.6 Account deletion: you can delete your account directly from within the TalkMate mobile app (Settings, then Delete account) or by contacting hello@talkmate.com.au. When you delete your account it is disabled immediately and your personal data is permanently deleted within 30 days, except for limited records we are required to keep to meet legal, tax, or accounting obligations.',
  },
  {
    heading: '9. Third party services',
    body: 'TalkMate uses the following third party services to provide the platform:\n• Vapi: voice AI infrastructure (USA, data processing agreement in place)\n• ElevenLabs: voice synthesis (USA, data processing agreement in place)\n• Supabase: database hosting (AWS ap-southeast-2, Sydney)\n• Stripe: payment processing (USA, PCI DSS compliant)\n• Vercel: application hosting (USA, data processing agreement in place)\n• Expo: mobile push notification delivery (USA, data processing agreement in place)\n• Twilio: SMS communications (USA, data processing agreement in place)\n• Meta Platforms Inc.: Instagram and Facebook messaging APIs for Social DM Nurture (USA, data processing agreement in place — applies to Social DM Nurture subscribers only)\nEach of these providers is bound by contract to protect your data to a standard comparable to that required under the Australian Privacy Act 1988.',
  },
  {
    heading: '10. Complaints',
    body: 'If you have a privacy concern contact hello@talkmate.com.au. If we cannot resolve your concern you may contact the Office of the Australian Information Commissioner at oaic.gov.au.',
  },
  {
    heading: '11. Changes to this policy',
    body: 'We will notify you of material changes to this policy by email and by notice in your portal. Continued use of the Service after notification constitutes acceptance.',
  },
]

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
          <article style={{ background: 'white', border: '1px solid var(--edge)', borderRadius: 14, padding: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Version 3.1</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', marginBottom: 22 }}>TalkMate Privacy Policy</h2>
            {SECTIONS.map(s => (
              <div id={s.heading} key={s.heading} style={{ marginBottom: 22 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{s.heading}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-wrap' as const, margin: 0 }}>{s.body}</p>
              </div>
            ))}
            <p id="act" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 30 }}>Last updated: 7 June 2026</p>
          </article>
        </div>
      </section>
    </>
  )
}
