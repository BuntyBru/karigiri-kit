import type { Config } from 'tailwindcss'
import { tokens } from '@karigiri-kit/tokens'

const karigiriPreset: Partial<Config> = {
  darkMode: ['class'],
  content: [],
  theme: {
    extend: {
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
      borderRadius: {
        sm: tokens.radius.sm.value,
        md: tokens.radius.md.value,
        lg: tokens.radius.lg.value,
        xl: tokens.radius.xl.value,
        full: tokens.radius.full.value,
      },
      spacing: {
        '1': tokens.spacing['1'].value,
        '2': tokens.spacing['2'].value,
        '3': tokens.spacing['3'].value,
        '4': tokens.spacing['4'].value,
        '5': tokens.spacing['5'].value,
        '6': tokens.spacing['6'].value,
        '8': tokens.spacing['8'].value,
        '10': tokens.spacing['10'].value,
        '12': tokens.spacing['12'].value,
        '16': tokens.spacing['16'].value,
        '20': tokens.spacing['20'].value,
        '24': tokens.spacing['24'].value,
      },
      boxShadow: {
        sm: tokens.shadow.sm.value,
        md: tokens.shadow.md.value,
        lg: tokens.shadow.lg.value,
        xl: tokens.shadow.xl.value,
        '2xl': tokens.shadow['2xl'].value,
        inner: tokens.shadow.inner.value,
      },
      fontFamily: {
        body: [tokens.typography.fontFamily.body.value, 'sans-serif'],
        display: [tokens.typography.fontFamily.display.value, 'sans-serif'],
        mono: [tokens.typography.fontFamily.mono.value, 'monospace'],
      },
      fontSize: {
        xs: tokens.typography.fontSize.xs.value,
        sm: tokens.typography.fontSize.sm.value,
        base: tokens.typography.fontSize.base.value,
        lg: tokens.typography.fontSize.lg.value,
        xl: tokens.typography.fontSize.xl.value,
        '2xl': tokens.typography.fontSize['2xl'].value,
        '3xl': tokens.typography.fontSize['3xl'].value,
        '4xl': tokens.typography.fontSize['4xl'].value,
        '5xl': tokens.typography.fontSize['5xl'].value,
      },
      fontWeight: {
        normal: tokens.typography.fontWeight.normal.value,
        medium: tokens.typography.fontWeight.medium.value,
        semibold: tokens.typography.fontWeight.semibold.value,
        bold: tokens.typography.fontWeight.bold.value,
      },
      lineHeight: {
        tight: tokens.typography.lineHeight.tight.value,
        normal: tokens.typography.lineHeight.normal.value,
        relaxed: tokens.typography.lineHeight.relaxed.value,
      },
      transitionDuration: {
        fast: tokens.transition.duration.fast.value,
        normal: tokens.transition.duration.normal.value,
        slow: tokens.transition.duration.slow.value,
      },
      transitionTimingFunction: {
        ease: tokens.transition.easing.ease.value,
        'ease-in': tokens.transition.easing.easeIn.value,
        'ease-out': tokens.transition.easing.easeOut.value,
        'ease-in-out': tokens.transition.easing.easeInOut.value,
      },
    },
  },
  plugins: [],
}

export default karigiriPreset
export { karigiriPreset } 