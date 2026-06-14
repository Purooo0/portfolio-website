import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { JourneySection } from '@/components/journey-section'
import { CreativeCornerSection } from '@/components/creative-corner-section'
import { ValuesSection } from '@/components/values-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <CreativeCornerSection />
      <ValuesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
