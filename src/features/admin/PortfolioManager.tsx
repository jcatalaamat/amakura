import { memo, useState } from 'react'
import { H3, Paragraph, ScrollView, SizableText, View, XStack, YStack } from 'tamagui'

import { allProjects } from '~/data/queries/portfolio'
import { Button } from '~/interface/buttons/Button'
import { PlusIcon } from '~/interface/icons/phosphor/PlusIcon'
import { TrashIcon } from '~/interface/icons/phosphor/TrashIcon'
import { useQuery } from '~/zero/client'

import type { PortfolioProject } from '~/database/schema-public'

const ProjectCard = memo(({ project }: { project: PortfolioProject }) => {
  return (
    <YStack
      bg="$color2"
      rounded="$4"
      borderWidth={1}
      borderColor="$color4"
      overflow="hidden"
    >
      {project.imageUrl && (
        <View height={200} bg="$color4">
          <img
            src={project.imageUrl}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </View>
      )}

      <YStack p="$4" gap="$2">
        <XStack justify="space-between" items="center">
          <H3 size="$4" fontWeight="600">
            {project.title}
          </H3>
          <View
            px="$2"
            py="$1"
            bg={project.featured ? '$green4' : '$color4'}
            rounded="$2"
          >
            <SizableText size="$2" color={project.featured ? '$green10' : '$color8'}>
              {project.featured ? 'Destacado' : 'Normal'}
            </SizableText>
          </View>
        </XStack>

        {project.description && (
          <Paragraph size="$3" color="$color11" numberOfLines={2}>
            {project.description}
          </Paragraph>
        )}

        <XStack gap="$4" pt="$2">
          <YStack>
            <SizableText size="$2" color="$color8">
              Categoría
            </SizableText>
            <SizableText size="$3" textTransform="capitalize">
              {project.category}
            </SizableText>
          </YStack>

          {project.location && (
            <YStack>
              <SizableText size="$2" color="$color8">
                Ubicación
              </SizableText>
              <SizableText size="$3">{project.location}</SizableText>
            </YStack>
          )}
        </XStack>

        <XStack gap="$2" pt="$2">
          <Button size="small" variant="secondary" flex={1}>
            Editar
          </Button>
          <Button size="small" variant="destructive" icon={<TrashIcon size={14} />} />
        </XStack>
      </YStack>
    </YStack>
  )
})

export function PortfolioManager() {
  const [projects] = useQuery(allProjects)

  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const categories = ['all', 'superadobe', 'cob', 'bamboo', 'stone', 'mixed']

  const filteredProjects = projects.filter((p) => {
    if (categoryFilter === 'all') return true
    return p.category === categoryFilter
  })

  return (
    <YStack flex={1} gap="$4">
      <XStack justify="space-between" items="center" px="$4" pt="$4">
        <H3 size="$6" fontWeight="700">
          Portafolio
        </H3>
        <Button size="small" icon={<PlusIcon size={16} />}>
          Nuevo Proyecto
        </Button>
      </XStack>

      <XStack gap="$2" px="$4" flexWrap="wrap">
        {categories.map((cat) => (
          <View
            key={cat}
            px="$3"
            py="$2"
            bg={categoryFilter === cat ? '$color8' : '$color3'}
            rounded="$3"
            cursor="pointer"
            onPress={() => setCategoryFilter(cat)}
            hoverStyle={{ bg: categoryFilter === cat ? '$color9' : '$color4' }}
          >
            <SizableText
              size="$2"
              color={categoryFilter === cat ? '$color1' : '$color11'}
              textTransform="capitalize"
            >
              {cat === 'all' ? 'Todos' : cat}
            </SizableText>
          </View>
        ))}
      </XStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$4" px="$4" pb="$10">
          {filteredProjects.length === 0 ? (
            <YStack items="center" py="$10">
              <SizableText size="$4" color="$color8">
                No hay proyectos
              </SizableText>
              <Paragraph size="$3" color="$color7" textAlign="center" pt="$2">
                Agrega tu primer proyecto de bioconstrucción
              </Paragraph>
            </YStack>
          ) : (
            <XStack flexWrap="wrap" gap="$4">
              {filteredProjects.map((project) => (
                <View key={project.id} width="100%" $md={{ width: 'calc(50% - 8px)' }}>
                  <ProjectCard project={project} />
                </View>
              ))}
            </XStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
