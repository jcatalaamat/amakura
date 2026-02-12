import { H2, Paragraph, styled, View, XStack, YStack } from 'tamagui'

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

const ProjectCard = styled(YStack, {
  bg: '$color3',
  rounded: '$6',
  overflow: 'hidden',
  cursor: 'pointer',
  hoverStyle: {
    scale: 1.02,
  },
  style: {
    transition: 'transform 200ms ease',
  },
})

const projects = [
  {
    title: 'Casa Domo',
    category: 'Super Adobe',
    description: 'Estructura geodésica con técnica Super Adobe y acabados naturales.',
  },
  {
    title: 'Baño Seco',
    category: 'Cob',
    description: 'Sistema de compostaje integrado con construcción en cob.',
  },
  {
    title: 'Cocina Exterior',
    category: 'Bambú',
    description: 'Espacio abierto con estructura de bambú y techo vivo.',
  },
  {
    title: 'Alberca Natural',
    category: 'Piedra',
    description: 'Filtración biológica con plantas acuáticas nativas.',
  },
]

export function PortfolioSection() {
  return (
    <YStack
      id="portafolio"
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$10"
      bg="$color1"
    >
      <YStack gap="$8" items="center" maxW={1200} width="100%">
        <YStack gap="$4" items="center">
          <Paragraph
            size="$3"
            color="$color7"
            letterSpacing={3}
            textTransform="uppercase"
          >
            Nuestro Trabajo
          </Paragraph>
          <SectionTitle>Portafolio</SectionTitle>
          <Paragraph
            size="$5"
            color="$color9"
            textAlign="center"
            maxW={600}
            lineHeight={26}
          >
            Cada estructura cuenta una historia de colaboración entre la tierra, las manos
            y la visión.
          </Paragraph>
        </YStack>

        <XStack gap="$4" flexWrap="wrap" justify="center" width="100%">
          {projects.map((project, i) => (
            <ProjectCard key={i} width={280} height={320}>
              <View flex={1} bg="$color4" items="center" justify="center">
                <Paragraph color="$color8" size="$3">
                  [Imagen]
                </Paragraph>
              </View>
              <YStack p="$4" gap="$2">
                <Paragraph
                  size="$2"
                  color="$color7"
                  textTransform="uppercase"
                  letterSpacing={2}
                >
                  {project.category}
                </Paragraph>
                <Paragraph fontFamily="$heading" size="$6" color="$color12">
                  {project.title}
                </Paragraph>
                <Paragraph size="$3" color="$color9" lineHeight={20}>
                  {project.description}
                </Paragraph>
              </YStack>
            </ProjectCard>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}
