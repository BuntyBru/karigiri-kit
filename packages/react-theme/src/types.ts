export interface Theme {
  colors: {
    bg: Record<string, string>
    text: Record<string, string>
    accent: Record<string, string>
    border: Record<string, string>
    semantic: Record<string, string>
  }
  radius: Record<string, string>
  spacing: Record<string, string>
  shadow: Record<string, string>
  typography: {
    fontFamily: Record<string, string>
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
    lineHeight: Record<string, string>
  }
  transition: {
    duration: Record<string, string>
    easing: Record<string, string>
  }
}

export interface ThemeConfig {
  mode: 'dark' | 'light' | 'system'
  customTheme?: Partial<Theme>
}

export interface KarigiriTheme extends ThemeConfig {
  resolvedTheme: Theme
  setMode: (mode: ThemeConfig['mode']) => void
  setCustomTheme: (theme: Partial<Theme>) => void
} 