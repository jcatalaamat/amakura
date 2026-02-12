import { useState } from 'react'
import { H2, Input, Paragraph, styled, TextArea, XStack, YStack } from 'tamagui'

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

const FormInput = styled(Input, {
  bg: '$color2',
  borderColor: '$color4',
  borderWidth: 1,
  rounded: '$4',
  px: '$4',
  py: '$3',
  color: '$color12',
  placeholderTextColor: '$color8',
  focusStyle: {
    borderColor: '$color6',
  },
})

const FormTextArea = styled(TextArea, {
  bg: '$color2',
  borderColor: '$color4',
  borderWidth: 1,
  rounded: '$4',
  px: '$4',
  py: '$3',
  color: '$color12',
  placeholderTextColor: '$color8',
  minH: 120,
  focusStyle: {
    borderColor: '$color6',
  },
})

const InterestChip = styled(YStack, {
  bg: '$color3',
  rounded: '$3',
  px: '$4',
  py: '$2',
  cursor: 'pointer',
  borderWidth: 1,
  borderColor: '$color4',

  variants: {
    selected: {
      true: {
        bg: '$color5',
        borderColor: '$color7',
      },
    },
  } as const,
})

const interests = ['Visitar', 'Construir', 'Taller', 'Voluntariado']

export function ContactSection() {
  const [selectedInterest, setSelectedInterest] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = () => {
    console.info('Form submitted:', { ...formData, interest: selectedInterest })
  }

  return (
    <YStack
      id="contacto"
      className="scroll-snap-section"
      minH="100vh"
      items="center"
      justify="center"
      px="$4"
      py="$10"
      bg="$color2"
    >
      <YStack gap="$8" items="center" maxW={600} width="100%">
        <YStack gap="$4" items="center">
          <Paragraph
            size="$3"
            color="$color7"
            letterSpacing={3}
            textTransform="uppercase"
          >
            Contacto
          </Paragraph>
          <SectionTitle>Hablemos</SectionTitle>
          <Paragraph
            size="$5"
            color="$color9"
            textAlign="center"
            maxW={500}
            lineHeight={26}
          >
            Cuéntanos sobre tu proyecto, pregunta sobre nuestros talleres, o simplemente
            saluda.
          </Paragraph>
        </YStack>

        <YStack gap="$3" width="100%">
          <Paragraph size="$3" color="$color9">
            Me interesa:
          </Paragraph>
          <XStack gap="$2" flexWrap="wrap">
            {interests.map((interest) => (
              <InterestChip
                key={interest}
                selected={selectedInterest === interest}
                onPress={() => setSelectedInterest(interest)}
              >
                <Paragraph
                  size="$3"
                  color={selectedInterest === interest ? '$color12' : '$color10'}
                >
                  {interest}
                </Paragraph>
              </InterestChip>
            ))}
          </XStack>
        </YStack>

        <YStack gap="$4" width="100%">
          <FormInput
            placeholder="Nombre"
            value={formData.name}
            onChangeText={(name) => setFormData((prev) => ({ ...prev, name }))}
          />
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(email) => setFormData((prev) => ({ ...prev, email }))}
          />
          <FormTextArea
            placeholder="Mensaje"
            value={formData.message}
            onChangeText={(message) => setFormData((prev) => ({ ...prev, message }))}
          />
          <Button theme="accent" size="large" onPress={handleSubmit}>
            Enviar Mensaje
          </Button>
        </YStack>

        <YStack
          gap="$6"
          items="center"
          mt="$6"
          pt="$6"
          borderTopWidth={1}
          borderColor="$color4"
          width="100%"
        >
          <XStack gap="$8" flexWrap="wrap" justify="center">
            <YStack items="center" gap="$1">
              <Paragraph size="$3" color="$color8">
                WhatsApp
              </Paragraph>
              <Paragraph size="$4" color="$color11">
                +52 958 123 4567
              </Paragraph>
            </YStack>
            <YStack items="center" gap="$1">
              <Paragraph size="$3" color="$color8">
                Email
              </Paragraph>
              <Paragraph size="$4" color="$color11">
                hola@amakura.mx
              </Paragraph>
            </YStack>
            <YStack items="center" gap="$1">
              <Paragraph size="$3" color="$color8">
                Ubicación
              </Paragraph>
              <Paragraph size="$4" color="$color11">
                Zapotal, Mazunte
              </Paragraph>
            </YStack>
          </XStack>

          <Paragraph size="$3" color="$color8" textAlign="center">
            Viernes a Domingo, 2:00 - 8:00 PM
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  )
}
