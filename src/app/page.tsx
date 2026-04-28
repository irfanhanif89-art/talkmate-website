import Hero from '@/components/Hero'
import ProofBar from '@/components/ProofBar'
import CallbackForm from '@/components/CallbackForm'
import TalkButton from '@/components/TalkButton'
import HowItWorks from '@/components/HowItWorks'
import TwoProducts from '@/components/TwoProducts'
import RevenueCalculator from '@/components/RevenueCalculator'
import PortalPreview from '@/components/PortalPreview'
import Testimonials from '@/components/Testimonials'
import IntegrationsRow from '@/components/IntegrationsRow'
import PricingCards from '@/components/PricingCards'
import FinalCTA from '@/components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <CallbackForm />
      <TalkButton />
      <HowItWorks />
      <TwoProducts />
      <RevenueCalculator />
      <PortalPreview />
      <Testimonials />
      <IntegrationsRow />
      <PricingCards />
      <FinalCTA />
    </>
  )
}
