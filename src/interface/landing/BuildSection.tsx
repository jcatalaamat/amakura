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

const ServiceCard = styled(YStack, {
  bg: '$color1',
  rounded: '$6',
  p: '$6',
  gap: '$4',
  flex: 1,
  minW: 300,
  maxW: 380,
  borderWidth: 1,
  borderColor: '$color4',
})

const TechBadge = styled(YStack, {
  bg: '$color3',
  rounded: '$3',
  px: '$3',
  py: '$1',
})

export function BuildSection() {
  return (
    <YStack
      id="construir"
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$10"
      theme="green"
      bg="$background"
    >
      <YStack gap="$8" items="center" maxW={1200} width="100%">
        <YStack gap="$4" items="center">
          <Paragraph
            size="$3"
            color="$color7"
            letterSpacing={3}
            textTransform="uppercase"
          >
            Servicios
          </Paragraph>
          <SectionTitle>Construye con Nosotros</SectionTitle>
          <Paragraph
            size="$5"
            color="$color9"
            textAlign="center"
            maxW={600}
            lineHeight={26}
          >
            Diseñamos y construimos espacios que respiran, usando técnicas ancestrales y
            materiales de la tierra.
          </Paragraph>
        </YStack>

        <XStack gap="$5" flexWrap="wrap" justify="center" width="100%">
          <ServiceCard>
            <Paragraph fontFamily="$heading" size="$8" color="$color12">
              Diseño + Construcción
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={24}>
              Servicio completo desde el diseño arquitectónico hasta la construcción
              final. Trabajamos contigo para crear un espacio único y sostenible.
            </Paragraph>
            <XStack gap="$2" flexWrap="wrap">
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Super Adobe
                </Paragraph>
              </TechBadge>
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Cob
                </Paragraph>
              </TechBadge>
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Bambú
                </Paragraph>
              </TechBadge>
            </XStack>
            <Paragraph size="$3" color="$color8">
              Consulta para cotización
            </Paragraph>
          </ServiceCard>

          <ServiceCard>
            <Paragraph fontFamily="$heading" size="$8" color="$color12">
              Diseño Regenerativo
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={24}>
              Planeación de sitio con principios de permacultura. Optimización de agua,
              energía y ciclos naturales para tu terreno.
            </Paragraph>
            <XStack gap="$2" flexWrap="wrap">
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Permacultura
                </Paragraph>
              </TechBadge>
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Captación
                </Paragraph>
              </TechBadge>
            </XStack>
            <Paragraph size="$3" color="$color8">
              Desde $15,000 MXN
            </Paragraph>
          </ServiceCard>

          <ServiceCard>
            <Paragraph fontFamily="$heading" size="$8" color="$color12">
              Consultoría
            </Paragraph>
            <Paragraph size="$4" color="$color9" lineHeight={24}>
              Asesoría técnica para proyectos de bioconstrucción. Revisión de diseños,
              selección de materiales, y solución de problemas.
            </Paragraph>
            <XStack gap="$2" flexWrap="wrap">
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Asesoría
                </Paragraph>
              </TechBadge>
              <TechBadge>
                <Paragraph size="$2" color="$color11">
                  Revisión
                </Paragraph>
              </TechBadge>
            </XStack>
            <Paragraph size="$3" color="$color8">
              $500 MXN / hora
            </Paragraph>
          </ServiceCard>
        </XStack>

        <Link href="#contacto">
          <Button theme="accent" size="large">
            Iniciar Proyecto
          </Button>
        </Link>
      </YStack>
    </YStack>
  )
}
