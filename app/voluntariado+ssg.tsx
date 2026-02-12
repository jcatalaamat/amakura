import { useState } from 'react'
import { H1, Input, Paragraph, TextArea, XStack, YStack } from 'tamagui'

import { HeadInfo } from '~/interface/app/HeadInfo'
import { Button } from '~/interface/buttons/Button'
import { PageContainer } from '~/interface/layout/PageContainer'

export function VoluntariadoPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    experience: '',
    motivation: '',
    skills: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.motivation) {
      setError('Por favor completa los campos requeridos')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Error al enviar la solicitud')

      setSuccess(true)
      setForm({
        name: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        experience: '',
        motivation: '',
        skills: '',
      })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} bg="$color1">
      <HeadInfo
        title="Voluntariado - Amakura"
        description="Únete a nuestro programa de voluntariado en Amakura. Aprende bioconstrucción y permacultura mientras contribuyes a un proyecto regenerativo."
      />

      <PageContainer>
        <YStack py="$8" px="$4" maxW={600} mx="auto" gap="$6">
          <YStack gap="$3" items="center">
            <Paragraph
              size="$2"
              color="$color8"
              textTransform="uppercase"
              letterSpacing={3}
            >
              Programa de Voluntariado
            </Paragraph>
            <H1
              fontFamily="$heading"
              size="$9"
              color="$color12"
              textAlign="center"
            >
              Construye con nosotros
            </H1>
            <Paragraph
              size="$5"
              color="$color9"
              textAlign="center"
              maxW={500}
              lineHeight={26}
            >
              Intercambia tu energía por conocimiento, comida y un lugar en el bosque.
              Estancias de 2 a 4 semanas.
            </Paragraph>
          </YStack>

          {success ? (
            <YStack
              bg="$color3"
              p="$6"
              rounded="$4"
              items="center"
              gap="$3"
            >
              <Paragraph size="$6" color="$color11" fontWeight="600">
                ¡Solicitud enviada!
              </Paragraph>
              <Paragraph size="$4" color="$color9" textAlign="center">
                Revisaremos tu información y te contactaremos pronto.
              </Paragraph>
            </YStack>
          ) : (
            <YStack gap="$4">
              <XStack gap="$3">
                <Input
                  flex={1}
                  placeholder="Nombre *"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  bg="$color2"
                  borderColor="$color5"
                />
                <Input
                  flex={1}
                  placeholder="Email *"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  bg="$color2"
                  borderColor="$color5"
                  keyboardType="email-address"
                />
              </XStack>

              <Input
                placeholder="Teléfono (opcional)"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                bg="$color2"
                borderColor="$color5"
              />

              <XStack gap="$3">
                <Input
                  flex={1}
                  placeholder="Fecha inicio (ej: 2026-03-01)"
                  value={form.startDate}
                  onChangeText={(text) => setForm({ ...form, startDate: text })}
                  bg="$color2"
                  borderColor="$color5"
                />
                <Input
                  flex={1}
                  placeholder="Fecha fin (ej: 2026-03-15)"
                  value={form.endDate}
                  onChangeText={(text) => setForm({ ...form, endDate: text })}
                  bg="$color2"
                  borderColor="$color5"
                />
              </XStack>

              <TextArea
                placeholder="Experiencia previa en bioconstrucción, permacultura, etc."
                value={form.experience}
                onChangeText={(text) => setForm({ ...form, experience: text })}
                bg="$color2"
                borderColor="$color5"
                rows={3}
              />

              <TextArea
                placeholder="¿Por qué quieres ser voluntario en Amakura? *"
                value={form.motivation}
                onChangeText={(text) => setForm({ ...form, motivation: text })}
                bg="$color2"
                borderColor="$color5"
                rows={4}
              />

              <TextArea
                placeholder="Habilidades que puedes aportar"
                value={form.skills}
                onChangeText={(text) => setForm({ ...form, skills: text })}
                bg="$color2"
                borderColor="$color5"
                rows={3}
              />

              {error && (
                <Paragraph size="$3" color="$red10">
                  {error}
                </Paragraph>
              )}

              <Button
                theme="accent"
                size="large"
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </YStack>
          )}
        </YStack>
      </PageContainer>
    </YStack>
  )
}
