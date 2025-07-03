import { tokens } from '@karigiri-kit/tokens'

export const useKarigiriTokens = () => {
  // Convert design tokens to React Native format
  const convertedTokens = {
    colors: {
      bg: {
        DEFAULT: tokens.color.bg.DEFAULT.value,
        surface: tokens.color.bg.surface.value,
        subtle: tokens.color.bg.subtle.value,
        muted: tokens.color.bg.muted.value,
        hover: tokens.color.bg.hover.value,
      },
      text: {
        primary: tokens.color.text.primary.value,
        secondary: tokens.color.text.secondary.value,
        muted: tokens.color.text.muted.value,
        inverse: tokens.color.text.inverse.value,
      },
      accent: {
        teal: tokens.color.accent.teal.value,
        eco: tokens.color.accent.eco.value,
        amber: tokens.color.accent.amber.value,
        rose: tokens.color.accent.rose.value,
      },
      border: {
        DEFAULT: tokens.color.border.DEFAULT.value,
        subtle: tokens.color.border.subtle.value,
        strong: tokens.color.border.strong.value,
      },
      semantic: {
        success: tokens.color.semantic.success.value,
        warning: tokens.color.semantic.warning.value,
        error: tokens.color.semantic.error.value,
        info: tokens.color.semantic.info.value,
      },
    },
    spacing: {
      1: parseInt(tokens.spacing['1'].value, 10),
      2: parseInt(tokens.spacing['2'].value, 10),
      3: parseInt(tokens.spacing['3'].value, 10),
      4: parseInt(tokens.spacing['4'].value, 10),
      5: parseInt(tokens.spacing['5'].value, 10),
      6: parseInt(tokens.spacing['6'].value, 10),
      8: parseInt(tokens.spacing['8'].value, 10),
      10: parseInt(tokens.spacing['10'].value, 10),
      12: parseInt(tokens.spacing['12'].value, 10),
      16: parseInt(tokens.spacing['16'].value, 10),
      20: parseInt(tokens.spacing['20'].value, 10),
      24: parseInt(tokens.spacing['24'].value, 10),
    },
    radius: {
      sm: parseInt(tokens.radius.sm.value, 10),
      md: parseInt(tokens.radius.md.value, 10),
      lg: parseInt(tokens.radius.lg.value, 10),
      xl: parseInt(tokens.radius.xl.value, 10),
      full: 9999,
    },
    typography: {
      fontSize: {
        xs: parseInt(tokens.typography.fontSize.xs.value, 10),
        sm: parseInt(tokens.typography.fontSize.sm.value, 10),
        base: parseInt(tokens.typography.fontSize.base.value, 10),
        lg: parseInt(tokens.typography.fontSize.lg.value, 10),
        xl: parseInt(tokens.typography.fontSize.xl.value, 10),
      },
      fontWeight: {
        normal: tokens.typography.fontWeight.normal.value,
        medium: tokens.typography.fontWeight.medium.value,
        semibold: tokens.typography.fontWeight.semibold.value,
        bold: tokens.typography.fontWeight.bold.value,
      },
    },
  }

  return convertedTokens
} 