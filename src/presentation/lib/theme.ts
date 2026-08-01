export const THEMES = ['aura', 'fairy'] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'aura'

export const THEME_STORAGE_KEY = 'altar-theme'
