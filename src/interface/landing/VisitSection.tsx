import { H2, Paragraph, styled, XStack, YStack } from 'tamagui'

import { Link } from '~/interface/app/Link'

import { Button } from '../buttons/Button'

const SectionTitle = styled(H2, {
  fontFamily: '$heading',
  size: '$10',
  fontWeight: '400',
  color: '$color12',
  textAlign: 'center',
  letterSpacing: -1,

  '$max-md': {
    size: '$8',
  },
})

const SectionSubtitle = styled(Paragraph, {
  fontFamily: '$body',
  size: '$5',
  color: '$color9',
  textAlign: 'center',
  maxW: 600,
  lineHeight: 26,
})

const ExperienceCard = styled(YStack, {
  bg: '$color2',
  rounded: '$6',
  p: '$5',
  gap: '$3',
  flex: 1,
  minW: 280,
  maxW: 350,
  borderWidth: 1,
  borderColor: '$color4',
  cursor: 'pointer',
  hoverStyle: {
    bg: '$color3',
    borderColor: '$color5',
  },
})

export function VisitSection() {
  return (
    <YStack
      id="visitar"
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$10"
      bg="$color2"
    >
      <YStack gap="$8" items="center" maxW={1100} width="100%">
        <YStack gap="$4" items="center">
          <Paragraph
            size="$3"
            color="$color7"
            letterSpacing={3}
            textTransform="uppercase"
          >
            Experiencias
          </Paragraph>
          <SectionTitle>Visítanos</SectionTitle>
          <SectionSubtitle>
            Abierto viernes a domingo de 2:00 a 8:00 PM. Disfruta de nuestra alberca
            natural, comida orgánica y la paz de un espacio construido con amor.
          </SectionSubtitle>
        </YStack>

        <XStack gap="$4" flexWrap="wrap" justify="center" width="100%">
          <ExperienceCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Alberca Natural
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Día de Alberca
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Relájate en nuestra alberca de agua natural filtrada, rodeada de vegetación
              nativa.
            </Paragraph>
            <Paragraph size="$6" color="$color11" fontWeight="600">
              $150 MXN
            </Paragraph>
          </ExperienceCard>

          <ExperienceCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Gastronomía
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Restaurante
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Comida orgánica preparada con ingredientes locales y técnicas tradicionales.
            </Paragraph>
            <Paragraph size="$6" color="$color11" fontWeight="600">
              Menú del día
            </Paragraph>
          </ExperienceCard>

          <ExperienceCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Tour
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Recorrido Guiado
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Conoce las técnicas de bioconstrucción y permacultura que usamos en cada
              estructura.
            </Paragraph>
            <Paragraph size="$6" color="$color11" fontWeight="600">
              $200 MXN
            </Paragraph>
          </ExperienceCard>
        </XStack>

        <Link href="/reservar">
          <Button theme="accent" size="large">
            Reservar Visita
          </Button>
        </Link>
      </YStack>
    </YStack>
  )
}
