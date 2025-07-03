import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useKarigiriTokens } from '../hooks/useKarigiriTokens'

export interface InputProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  style?: any
  multiline?: boolean
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  multiline = false,
}) => {
  const tokens = useKarigiriTokens()

  const inputStyles = StyleSheet.create({
    input: {
      backgroundColor: tokens.colors.bg.surface,
      borderWidth: 1,
      borderColor: tokens.colors.border.DEFAULT,
      borderRadius: tokens.radius.md,
      padding: tokens.spacing[3],
      fontSize: tokens.typography.fontSize.base,
      color: tokens.colors.text.primary,
      minHeight: multiline ? 80 : 40,
    },
  })

  return (
    <TextInput
      style={[inputStyles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={tokens.colors.text.muted}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  )
} 