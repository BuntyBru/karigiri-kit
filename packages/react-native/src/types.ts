export interface KarigiriTheme {
  colors: {
    bg: Record<string, string>
    text: Record<string, string>
    accent: Record<string, string>
    border: Record<string, string>
    semantic: Record<string, string>
  }
  spacing: Record<string, number>
  radius: Record<string, number>
  typography: {
    fontSize: Record<string, number>
    fontWeight: Record<string, string>
  }
} 