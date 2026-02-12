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

const WorkshopCard = styled(YStack, {
  bg: '$color2',
  rounded: '$6',
  p: '$5',
  gap: '$3',
  flex: 1,
  minW: 280,
  maxW: 350,
  borderWidth: 1,
  borderColor: '$color4',
})

export function LearnSection() {
  return (
    <YStack
      id="aprender"
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$10"
      bg="$color1"
    >
      <YStack gap="$8" items="center" maxW={1100} width="100%">
        <YStack gap="$4" items="center">
          <Paragraph
            size="$3"
            color="$color7"
            letterSpacing={3}
            textTransform="uppercase"
          >
            Educación
          </Paragraph>
          <SectionTitle>Aprende con Nosotros</SectionTitle>
          <Paragraph
            size="$5"
            color="$color9"
            textAlign="center"
            maxW={600}
            lineHeight={26}
          >
            Talleres prácticos, inmersiones de permacultura, y un programa de voluntariado
            para aprender haciendo.
          </Paragraph>
        </YStack>

        <XStack gap="$4" flexWrap="wrap" justify="center" width="100%">
          <WorkshopCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Taller
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Introducción al Super Adobe
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Aprende los fundamentos de esta técnica de construcción con sacos de tierra.
              Incluye práctica.
            </Paragraph>
            <XStack justify="space-between" items="center">
              <Paragraph size="$5" color="$color11" fontWeight="600">
                $1,500 MXN
              </Paragraph>
              <Paragraph size="$3" color="$color8">
                2 días
              </Paragraph>
            </XStack>
          </WorkshopCard>

          <WorkshopCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Inmersión
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Permacultura Práctica
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Una semana viviendo y aprendiendo los principios de diseño regenerativo en
              acción.
            </Paragraph>
            <XStack justify="space-between" items="center">
              <Paragraph size="$5" color="$color11" fontWeight="600">
                $8,000 MXN
              </Paragraph>
              <Paragraph size="$3" color="$color8">
                7 días
              </Paragraph>
            </XStack>
          </WorkshopCard>

          <WorkshopCard>
            <Paragraph
              size="$2"
              color="$color7"
              textTransform="uppercase"
              letterSpacing={2}
            >
              Retiro
            </Paragraph>
            <Paragraph fontFamily="$heading" size="$7" color="$color12">
              Reconexión con la Tierra
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={22}>
              Desconéctate del ruido y reconéctate con los ciclos naturales. Incluye
              hospedaje y alimentación.
            </Paragraph>
            <XStack justify="space-between" items="center">
              <Paragraph size="$5" color="$color11" fontWeight="600">
                $5,000 MXN
              </Paragraph>
              <Paragraph size="$3" color="$color8">
                3 días
              </Paragraph>
            </XStack>
          </WorkshopCard>
        </XStack>

        <YStack
          bg="$color3"
          rounded="$6"
          p="$6"
          width="100%"
          maxW={700}
          gap="$4"
          items="center"
          borderWidth={1}
          borderColor="$color5"
        >
          <Paragraph fontFamily="$heading" size="$7" color="$color12" textAlign="center">
            Programa de Voluntariado
          </Paragraph>
          <Paragraph
            size="$4"
            color="$color9"
            textAlign="center"
            maxW={500}
            lineHeight={24}
          >
            Intercambia tu trabajo por aprendizaje práctico en bioconstrucción y
            permacultura. Estancias de 2 semanas mínimo.
          </Paragraph>
          <Link href="/voluntariado">
            <Button size="large" variant="outlined">
              Aplicar
            </Button>
          </Link>
        </YStack>
      </YStack>
    </YStack>
  )
}
