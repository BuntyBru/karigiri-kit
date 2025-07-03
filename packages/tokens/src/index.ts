import tokens from '../tokens.json'

export { tokens }
export default tokens

// Type definitions
export interface Token {
  value: string | number
  type: string
}

export interface TokenGroup {
  [key: string]: Token | TokenGroup
}

export interface DesignTokens {
  color: TokenGroup
  radius: TokenGroup
  spacing: TokenGroup
  shadow: TokenGroup
  typography: TokenGroup
  transition: TokenGroup
}

// Re-export for convenience
export const {
  color,
  radius,
  spacing,
  shadow,
  typography,
  transition,
} = tokens as DesignTokens 