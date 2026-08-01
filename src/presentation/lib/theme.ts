export const THEMES = ['fairy', 'aura'] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'fairy'

export const THEME_STORAGE_KEY = 'altar-theme'
