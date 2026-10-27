import { BenefitsSection } from '../components/landing/BenefitsSection';
import { CapabilitiesSection } from '../components/landing/CapabilitiesSection';
import { ClosingCta } from '../components/landing/ClosingCta';
import { HeroSection } from '../components/landing/HeroSection';
import { SiteFooter } from '../components/landing/SiteFooter';
import { SiteHeader } from '../components/landing/SiteHeader';
import { WorkflowSection } from '../components/landing/WorkflowSection';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-page">
        <HeroSection />
        <BenefitsSection />
        <CapabilitiesSection />
        <WorkflowSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
