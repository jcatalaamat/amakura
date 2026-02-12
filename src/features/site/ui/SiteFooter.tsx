import { Paragraph, XStack, YStack } from 'tamagui'

import { INSTAGRAM_URL, WHATSAPP_URL } from '~/constants/app'
import { Link } from '~/interface/app/Link'
import { PageContainer } from '~/interface/layout/PageContainer'

export const SiteFooter = () => {
  const year = new Date().getFullYear()

  return (
    <YStack py="$6" bg="$color2" borderTopWidth={1} borderColor="$color4">
      <PageContainer>
        <YStack mx="auto" width="100%" maxW={1000} px="$4" gap="$6">
          <XStack gap="$8" flexWrap="wrap" justify="center">
            <YStack gap="$2">
              <Paragraph
                size="$2"
                color="$color8"
                textTransform="uppercase"
                letterSpacing={2}
              >
                Navegación
              </Paragraph>
              <Link href="#visitar">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Visitar
                </Paragraph>
              </Link>
              <Link href="#construir">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Construir
                </Paragraph>
              </Link>
              <Link href="#aprender">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Aprender
                </Paragraph>
              </Link>
            </YStack>

            <YStack gap="$2">
              <Paragraph
                size="$2"
                color="$color8"
                textTransform="uppercase"
                letterSpacing={2}
              >
                Contacto
              </Paragraph>
              <Link href={WHATSAPP_URL} target="_blank">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  WhatsApp
                </Paragraph>
              </Link>
              <Link href={INSTAGRAM_URL} target="_blank">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Instagram
                </Paragraph>
              </Link>
              <Paragraph size="$3" color="$color10">
                hola@amakura.mx
              </Paragraph>
            </YStack>

            <YStack gap="$2">
              <Paragraph
                size="$2"
                color="$color8"
                textTransform="uppercase"
                letterSpacing={2}
              >
                Legal
              </Paragraph>
              <Link href="/privacy-policy">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Privacidad
                </Paragraph>
              </Link>
              <Link href="/terms-of-service">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Términos
                </Paragraph>
              </Link>
            </YStack>
          </XStack>

          <YStack
            items="center"
            gap="$2"
            pt="$4"
            borderTopWidth={1}
            borderColor="$color4"
          >
            <Paragraph fontFamily="$heading" size="$5" color="$color11">
              Amakura
            </Paragraph>
            <Paragraph size="$2" color="$color8" textAlign="center">
              Centro de Vida Regenerativa • Zapotal, Mazunte, Oaxaca
            </Paragraph>
            <Paragraph size="$2" color="$color7">
              © {year} Amakura. Todos los derechos reservados.
            </Paragraph>
          </YStack>
        </YStack>
      </PageContainer>
    </YStack>
  )
}
