import { Paragraph, Separator, XStack, YStack } from 'tamagui'

import { ADMIN_EMAIL, APP_NAME, INSTAGRAM_URL, WHATSAPP_URL } from '~/constants/app'
import { InfoCard } from '~/features/site/ui/InfoCard'
import { HeadInfo } from '~/interface/app/HeadInfo'
import { Link } from '~/interface/app/Link'
import { ChatCircleIcon } from '~/interface/icons/phosphor/ChatCircleIcon'
import { EnvelopeIcon } from '~/interface/icons/phosphor/EnvelopeIcon'
import { UserIcon } from '~/interface/icons/phosphor/UserIcon'
import { H2, H3, H5, SubHeading } from '~/interface/text/Headings'

export const sitemap = {
  priority: 0.7,
  changefreq: 'monthly',
}

export const HelpPage = () => {
  return (
    <YStack maxW={850} self="center" gap="$4">
      <HeadInfo
        title="Ayuda y Contacto"
        description="Contáctanos para reservaciones, información sobre bioconstrucción o voluntariado en Amakura."
      />
      <H2>Ayuda y Contacto</H2>

      <SubHeading>
        ¿Tienes preguntas sobre {APP_NAME}? Estamos aquí para ayudarte.
      </SubHeading>

      <XStack flexWrap="wrap" columnGap="$5" rowGap="$1">
        <Link asChild hideExternalIcon href={`mailto:${ADMIN_EMAIL}`} target="_blank">
          <InfoCard maxColumns={2} title="Correo" Icon={EnvelopeIcon}>
            Escríbenos a {ADMIN_EMAIL} y te responderemos lo antes posible.
          </InfoCard>
        </Link>

        <Link asChild hideExternalIcon href={WHATSAPP_URL} target="_blank">
          <InfoCard maxColumns={2} title="WhatsApp" Icon={ChatCircleIcon}>
            Contáctanos por WhatsApp para reservaciones o consultas rápidas.
          </InfoCard>
        </Link>

        <Link asChild hideExternalIcon href={INSTAGRAM_URL} target="_blank">
          <InfoCard maxColumns={2} title="Instagram" Icon={UserIcon}>
            Síguenos en Instagram para ver nuestros proyectos y actualizaciones.
          </InfoCard>
        </Link>
      </XStack>

      <YStack gap="$5" mt="$4">
        <H3>Preguntas Frecuentes</H3>

        <Separator opacity={0.5} />

        <YStack
          gap="$6"
          $lg={{
            pr: '$20',
          }}
        >
          <YStack gap="$3">
            <H5>¿Cuál es el horario de visita?</H5>
            <Paragraph>
              Amakura está abierto al público los viernes, sábados y domingos de 2:00 PM a
              8:00 PM. Puedes visitar la alberca natural y el restaurante sin reservación.
            </Paragraph>
          </YStack>

          <YStack gap="$3">
            <H5>¿Cómo puedo reservar una experiencia?</H5>
            <Paragraph>
              Puedes hacer una reservación a través de nuestro formulario de contacto,
              WhatsApp o correo electrónico. Te recomendamos reservar con al menos 48
              horas de anticipación.
            </Paragraph>
          </YStack>

          <YStack gap="$3">
            <H5>¿Ofrecen servicios de bioconstrucción?</H5>
            <Paragraph>
              Sí, ofrecemos diseño y construcción con técnicas naturales como Super Adobe,
              cob, bambú y piedra. Contáctanos para una consulta gratuita sobre tu
              proyecto.
            </Paragraph>
          </YStack>

          <YStack gap="$3">
            <H5>¿Cómo puedo ser voluntario?</H5>
            <Paragraph>
              Aceptamos voluntarios interesados en aprender sobre permacultura,
              bioconstrucción y vida regenerativa. Completa nuestro formulario de
              voluntariado y te contactaremos con más detalles.
            </Paragraph>
          </YStack>

          <YStack gap="$3">
            <H5>¿Dónde está ubicado Amakura?</H5>
            <Paragraph>
              Estamos en Zapotal, Mazunte, Oaxaca, México. Es una zona rural a unos 15
              minutos de Mazunte centro. Te enviaremos indicaciones detalladas al
              confirmar tu reservación.
            </Paragraph>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  )
}
