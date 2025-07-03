import { tokens } from '@karigiri-kit/tokens'
import type { Theme } from './types'

// Helper function to extract token values
const extractTokenValues = (tokenGroup: any): Record<string, string> => {
  const result: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(tokenGroup)) {
    if (typeof value === 'object' && value !== null) {
      if ('value' in value) {
        result[key] = value.value as string
      } else {
        // Handle nested objects
        const nested = extractTokenValues(value)
        Object.assign(result, nested)
      }
    }
  }
  
  return result
}

// Dark theme (default)
export const themeDark: Theme = {
  colors: {
    bg: extractTokenValues(tokens.color.bg),
    text: extractTokenValues(tokens.color.text),
    accent: extractTokenValues(tokens.color.accent),
    border: extractTokenValues(tokens.color.border),
    semantic: extractTokenValues(tokens.color.semantic),
  },
  radius: extractTokenValues(tokens.radius),
  spacing: extractTokenValues(tokens.spacing),
  shadow: extractTokenValues(tokens.shadow),
  typography: {
    fontFamily: extractTokenValues(tokens.typography.fontFamily),
    fontSize: extractTokenValues(tokens.typography.fontSize),
    fontWeight: extractTokenValues(tokens.typography.fontWeight),
    lineHeight: extractTokenValues(tokens.typography.lineHeight),
  },
  transition: {
    duration: extractTokenValues(tokens.transition.duration),
    easing: extractTokenValues(tokens.transition.easing),
  },
}

// Light theme (inverted colors)
export const themeLight: Theme = {
  ...themeDark,
  colors: {
    ...themeDark.colors,
    bg: {
      DEFAULT: '#FFFFFF',
      surface: '#F8F9FA',
      subtle: '#E9ECEF',
      muted: '#F1F3F4',
      hover: '#E9ECEF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      muted: '#6B7280',
      inverse: '#FFFFFF',
    },
    border: {
      DEFAULT: '#D1D5DB',
      subtle: '#E5E7EB',
      strong: '#9CA3AF',
    },
  },
}

// Theme creation utility
export const createTheme = (overrides: Partial<Theme> = {}): Theme => {
  return {
    colors: {
      ...themeDark.colors,
      ...overrides.colors,
    },
    radius: {
      ...themeDark.radius,
      ...overrides.radius,
    },
    spacing: {
      ...themeDark.spacing,
      ...overrides.spacing,
    },
    shadow: {
      ...themeDark.shadow,
      ...overrides.shadow,
    },
    typography: {
      ...themeDark.typography,
      ...overrides.typography,
    },
    transition: {
      ...themeDark.transition,
      ...overrides.transition,
    },
  }
} 