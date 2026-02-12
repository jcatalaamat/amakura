import { memo, useState } from 'react'
import { Paragraph, ScrollView, Separator, Sheet, Spacer, XStack, YStack } from 'tamagui'

import { LoginButton } from '~/features/auth/ui/LoginButton'
import { Link } from '~/interface/app/Link'
import { Button } from '~/interface/buttons/Button'
import { ScrollHeader } from '~/interface/headers/ScrollHeader'
import { ListIcon } from '~/interface/icons/phosphor/ListIcon'
import { PageContainer } from '~/interface/layout/PageContainer'
import { ListItem } from '~/interface/lists/ListItem'
import { ThemeSwitch } from '~/interface/theme/ThemeSwitch'

const navLinks = [
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#visitar', label: 'Visitar' },
  { href: '#construir', label: 'Construir' },
  { href: '#aprender', label: 'Aprender' },
  { href: '#contacto', label: 'Contacto' },
]

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const SiteHeader = memo(() => {
  return (
    <ScrollHeader>
      <PageContainer>
        <YStack width="100%" py="$3">
          <XStack width="100%" items="center" px="$4">
            <Link href="/" aria-label="Home">
              <YStack>
                <Paragraph
                  fontFamily="$heading"
                  size="$6"
                  color="$color12"
                  fontWeight="500"
                >
                  Amakura
                </Paragraph>
                <Paragraph
                  size="$1"
                  color="$color8"
                  mt={-4}
                  letterSpacing={1}
                >
                  Mazunte
                </Paragraph>
              </YStack>
            </Link>

            <Spacer flex={1} />

            <XStack gap="$6" items="center" display="none" $md={{ display: 'flex' }}>
              {navLinks.map((link) => (
                <Paragraph
                  key={link.href}
                  size="$3"
                  color="$color10"
                  hoverStyle={{ color: '$color12' }}
                  cursor="pointer"
                  onPress={() => scrollToSection(link.href)}
                >
                  {link.label}
                </Paragraph>
              ))}
            </XStack>

            <Spacer flex={1} />

            <XStack gap="$3" items="center" display="none" $md={{ display: 'flex' }}>
              <LoginButton />
              <Button theme="accent" onPress={() => scrollToSection('#visitar')}>
                Reservar
              </Button>
              <ThemeSwitch />
            </XStack>

            <SiteHeaderMenu />
          </XStack>
        </YStack>
      </PageContainer>
    </ScrollHeader>
  )
})

const SiteHeaderMenu = memo(() => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size="large"
        variant="transparent"
        circular
        icon={<ListIcon size="$1" />}
        aria-label="Menu"
        onPress={() => setOpen(true)}
        $md={{ display: 'none' }}
      />

      <Sheet
        open={open}
        onOpenChange={setOpen}
        transition="quickLessBouncy"
        modal
        dismissOnSnapToBottom
        snapPoints={[55]}
      >
        <Sheet.Overlay
          bg="$background"
          opacity={0.5}
          transition="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Frame bg="$color2" boxShadow="0 0 10px $shadow3">
          <YStack flex={1} flexBasis="auto" gap="$2">
            <ScrollView>
              <YStack p="$4" gap="$2">
                <Paragraph
                  size="$2"
                  color="$color8"
                  textTransform="uppercase"
                  letterSpacing={2}
                  mb="$2"
                >
                  Navegacion
                </Paragraph>

                {navLinks.map((link) => (
                  <ListItem
                    key={link.href}
                    onPress={() => {
                      setOpen(false)
                      setTimeout(() => scrollToSection(link.href), 300)
                    }}
                  >
                    <Paragraph size="$5" color="$color12">
                      {link.label}
                    </Paragraph>
                  </ListItem>
                ))}

                <Separator my="$4" />

                <XStack gap="$3" justify="center">
                  <LoginButton />
                  <Button
                    theme="accent"
                    onPress={() => {
                      setOpen(false)
                      setTimeout(() => scrollToSection('#visitar'), 300)
                    }}
                  >
                    Reservar
                  </Button>
                </XStack>

                <XStack justify="center" mt="$4">
                  <ThemeSwitch />
                </XStack>
              </YStack>
            </ScrollView>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
})
