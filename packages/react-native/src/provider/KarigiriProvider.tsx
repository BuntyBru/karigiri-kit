import React from 'react'
import { TamaguiProvider } from '@tamagui/core'
import { useKarigiriTokens } from '../hooks/useKarigiriTokens'

export interface KarigiriProviderProps {
  children: React.ReactNode
}

export const KarigiriProvider: React.FC<KarigiriProviderProps> = ({ children }) => {
  const tokens = useKarigiriTokens()

  return (
    <TamaguiProvider>
      {children}
    </TamaguiProvider>
  )
} 