import { YStack } from 'tamagui'

import { HeadInfo } from '~/interface/app/HeadInfo'
import { BuildSection } from '~/interface/landing/BuildSection'
import { ContactSection } from '~/interface/landing/ContactSection'
import { HeroSection } from '~/interface/landing/HeroSection'
import { LearnSection } from '~/interface/landing/LearnSection'
import { PortfolioSection } from '~/interface/landing/PortfolioSection'
import { VisitSection } from '~/interface/landing/VisitSection'

const ogImageUrl = `${process.env.ONE_SERVER_URL}/og.png`

export function IndexPage() {
  return (
    <YStack className="scroll-snap-container">
      <HeadInfo
        title="Amakura - Centro de Vida Regenerativa"
        description="Bioconstrucción, permacultura y reconexión con la naturaleza en Mazunte, Oaxaca. Visítanos, aprende con nosotros, o construye tu sueño."
        openGraph={{
          url: process.env.ONE_SERVER_URL,
          images: [{ url: ogImageUrl, width: 1200, height: 630 }],
        }}
      />

      <HeroSection />
      <PortfolioSection />
      <VisitSection />
      <BuildSection />
      <LearnSection />
      <ContactSection />
    </YStack>
  )
}
