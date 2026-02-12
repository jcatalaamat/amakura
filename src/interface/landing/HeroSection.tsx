import { H1, Paragraph, styled, View, XStack, YStack } from 'tamagui'

import { Link } from '~/interface/app/Link'

import { Button } from '../buttons/Button'

const HeroTitle = styled(H1, {
  fontFamily: '$heading',
  letterSpacing: -2,
  color: '$color12',
  size: '$12',
  fontWeight: '400',
  maxW: 700,
  textAlign: 'center',

  '$max-lg': {
    size: '$10',
  },

  '$max-md': {
    size: '$9',
  },
})

const HeroSubtitle = styled(Paragraph, {
  fontFamily: '$body',
  color: '$color9',
  size: '$6',
  maxW: 600,
  textAlign: 'center',
  lineHeight: 28,

  '$max-md': {
    size: '$5',
  },
})

const TagLine = styled(Paragraph, {
  fontFamily: '$body',
  color: '$color7',
  size: '$3',
  letterSpacing: 3,
  textTransform: 'uppercase',
  textAlign: 'center',
})

export function HeroSection() {
  return (
    <YStack
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$8"
      bg="$color1"
      position="relative"
    >
      <YStack
        gap="$6"
        items="center"
        maxW={900}
        animation="medium"
        enterStyle={{ opacity: 0, y: 20 }}
      >
        <TagLine>Zapotal, Mazunte, Oaxaca</TagLine>

        <HeroTitle>Donde la tierra enseña y el hogar crece</HeroTitle>

        <HeroSubtitle>
          Un centro de vida regenerativa dedicado a la bioconstrucción, permacultura y
          reconexión con la naturaleza. Visítanos, aprende con nosotros, o construye tu
          sueño.
        </HeroSubtitle>

        <XStack gap="$4" mt="$4" flexWrap="wrap" justify="center">
          <Link href="#visitar">
            <Button theme="accent" size="large">
              Visitar
            </Button>
          </Link>
          <Link href="#construir">
            <Button size="large" variant="outlined">
              Construir
            </Button>
          </Link>
          <Link href="#aprender">
            <Button size="large" variant="outlined">
              Aprender
            </Button>
          </Link>
        </XStack>

        <XStack gap="$6" mt="$8" opacity={0.7}>
          <YStack items="center" gap="$1">
            <Paragraph fontFamily="$heading" size="$8" color="$color11">
              5.0
            </Paragraph>
            <Paragraph size="$2" color="$color8">
              Google
            </Paragraph>
          </YStack>
          <View width={1} bg="$color5" />
          <YStack items="center" gap="$1">
            <Paragraph fontFamily="$heading" size="$8" color="$color11">
              100%
            </Paragraph>
            <Paragraph size="$2" color="$color8">
              Artesanal
            </Paragraph>
          </YStack>
          <View width={1} bg="$color5" />
          <YStack items="center" gap="$1">
            <Paragraph fontFamily="$heading" size="$8" color="$color11">
              Vie-Dom
            </Paragraph>
            <Paragraph size="$2" color="$color8">
              2-8 PM
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>

      <YStack
        position="absolute"
        bottom="$8"
        className="scroll-indicator"
        items="center"
        gap="$2"
      >
        <Paragraph size="$2" color="$color7">
          Descubre más
        </Paragraph>
        <YStack
          width={24}
          height={40}
          borderWidth={2}
          borderColor="$color6"
          rounded="$10"
          items="center"
          pt="$2"
        >
          <YStack width={4} height={8} bg="$color8" rounded="$10" animation="medium" />
        </YStack>
      </YStack>
    </YStack>
  )
}
