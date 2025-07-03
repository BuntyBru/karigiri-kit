import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useKarigiriTokens } from '../hooks/useKarigiriTokens'

export interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const tokens = useKarigiriTokens()

  const buttonStyles = StyleSheet.create({
    button: {
      paddingHorizontal: tokens.spacing[4],
      paddingVertical: tokens.spacing[2],
      borderRadius: tokens.radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: variant === 'primary' ? tokens.colors.accent.teal : tokens.colors.bg.surface,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? tokens.colors.border.DEFAULT : 'transparent',
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      fontSize: size === 'sm' ? tokens.typography.fontSize.sm : size === 'lg' ? tokens.typography.fontSize.lg : tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.medium as any,
      color: variant === 'primary' ? tokens.colors.text.inverse : tokens.colors.text.primary,
    },
  })

  return (
    <TouchableOpacity
      style={buttonStyles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={buttonStyles.text}>{children}</Text>
    </TouchableOpacity>
  )
} 