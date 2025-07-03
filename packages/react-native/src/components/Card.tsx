import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useKarigiriTokens } from '../hooks/useKarigiriTokens'

export interface CardProps {
  children: React.ReactNode
  style?: any
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const tokens = useKarigiriTokens()

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: tokens.colors.bg.surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing[4],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  })

  return (
    <View style={[cardStyles.card, style]}>
      {children}
    </View>
  )
} 