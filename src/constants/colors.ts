export const amakuraColors = {
  earth: '#3D2B1F',
  clay: '#B5651D',
  sand: '#D4A574',
  sage: '#7A8B6F',
  deepGreen: '#2C3E2D',
  forest: '#4A6741',
  cream: '#F5F0E8',
  warm: '#FAF8F3',
  ochre: '#C17817',
  terra: '#C75B39',
  char: '#2A2A2A',
  stone: '#8B8178',
  bark: '#5C4033',
  moss: '#6B7F5E',
  linen: '#EDE8DF',
} as const

export type AmakuraColor = keyof typeof amakuraColors
