import { memo } from 'react'
import { Paragraph, Spacer, XStack, YStack } from 'tamagui'

import { Link } from '~/interface/app/Link'
import { ScrollHeader } from '~/interface/headers/ScrollHeader'
import { PageContainer } from '~/interface/layout/PageContainer'
import { ThemeSwitch } from '~/interface/theme/ThemeSwitch'

export const SiteHeader = memo(() => {
  return (
    <ScrollHeader>
      <PageContainer>
        <YStack width="100%" py="$3">
          <XStack width="100%" items="center" px="$4">
            <Link href="/" aria-label="Home">
              <Paragraph
                fontFamily="$heading"
                size="$6"
                color="$color12"
                fontWeight="500"
              >
                Amakura
              </Paragraph>
            </Link>

            <Spacer flex={1} />

            <XStack gap="$6" items="center" display="none" $md={{ display: 'flex' }}>
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
              <Link href="#contacto">
                <Paragraph size="$3" color="$color10" hoverStyle={{ color: '$color12' }}>
                  Contacto
                </Paragraph>
              </Link>
            </XStack>

            <Spacer flex={1} $md={{ display: 'none' }} />

            <ThemeSwitch />
          </XStack>
        </YStack>
      </PageContainer>
    </ScrollHeader>
  )
})
