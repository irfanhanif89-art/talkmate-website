import Hero from '@/components/Hero'
import ProofBar from '@/components/ProofBar'
import CallbackForm from '@/components/CallbackForm'
import TalkButton from '@/components/TalkButton'
import CostComparison from '@/components/CostComparison'
import HowItWorks from '@/components/HowItWorks'
import TwoProducts from '@/components/TwoProducts'
import RevenueCalculator from '@/components/RevenueCalculator'
import PortalPreview from '@/components/PortalPreview'
import CrmSection from '@/components/CrmSection'
import Testimonials from '@/components/Testimonials'
import IntegrationsRow from '@/components/IntegrationsRow'
import PricingCards from '@/components/PricingCards'
import MeetYourReceptionist from '@/components/MeetYourReceptionist'
import FinalCTA from '@/components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <CallbackForm />
      <TalkButton />
      <CostComparison />
      <HowItWorks />
      <TwoProducts />
      <RevenueCalculator />
      <PortalPreview />
      <CrmSection />
      <Testimonials />
      <IntegrationsRow />
      <PricingCards />
      <MeetYourReceptionist />
      <FinalCTA />
    </>
  )
}
