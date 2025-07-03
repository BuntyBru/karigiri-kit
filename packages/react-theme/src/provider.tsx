'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Theme, ThemeConfig, KarigiriTheme } from './types'
import { themeDark, themeLight, createTheme } from './themes'

const KarigiriThemeContext = createContext<KarigiriTheme | undefined>(undefined)

export interface KarigiriProviderProps {
  theme?: Theme
  mode?: ThemeConfig['mode']
  customTheme?: Partial<Theme>
  children: React.ReactNode
}

export function KarigiriProvider({ 
  theme, 
  mode = 'dark', 
  customTheme, 
  children 
}: KarigiriProviderProps) {
  const [currentMode, setCurrentMode] = useState<ThemeConfig['mode']>(mode)
  const [currentCustomTheme, setCurrentCustomTheme] = useState<Partial<Theme> | undefined>(customTheme)

  // System theme detection
  useEffect(() => {
    if (currentMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        // This will trigger a re-render with the new system preference
        setCurrentMode('system')
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [currentMode])

  // Resolve the actual theme
  const resolveTheme = (): Theme => {
    if (theme) return theme
    
    let baseTheme: Theme
    
    if (currentMode === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      baseTheme = isDarkMode ? themeDark : themeLight
    } else {
      baseTheme = currentMode === 'dark' ? themeDark : themeLight
    }
    
    return currentCustomTheme ? createTheme(currentCustomTheme) : baseTheme
  }

  const resolvedTheme = resolveTheme()

  // Apply theme to document
  useEffect(() => {
    const isDark = resolvedTheme === themeDark || 
                  (currentMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
                  currentMode === 'dark'

    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
    
    // Set CSS custom properties
    const root = document.documentElement
    Object.entries(resolvedTheme.colors.bg).forEach(([key, value]) => {
      root.style.setProperty(`--karigiri-bg-${key}`, value)
    })
    Object.entries(resolvedTheme.colors.text).forEach(([key, value]) => {
      root.style.setProperty(`--karigiri-text-${key}`, value)
    })
    Object.entries(resolvedTheme.colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--karigiri-accent-${key}`, value)
    })
    Object.entries(resolvedTheme.colors.border).forEach(([key, value]) => {
      root.style.setProperty(`--karigiri-border-${key}`, value)
    })
    Object.entries(resolvedTheme.colors.semantic).forEach(([key, value]) => {
      root.style.setProperty(`--karigiri-semantic-${key}`, value)
    })
  }, [resolvedTheme, currentMode])

  const contextValue: KarigiriTheme = {
    mode: currentMode,
    customTheme: currentCustomTheme,
    resolvedTheme,
    setMode: setCurrentMode,
    setCustomTheme: setCurrentCustomTheme,
  }

  return (
    <KarigiriThemeContext.Provider value={contextValue}>
      {children}
    </KarigiriThemeContext.Provider>
  )
}

export function useKarigiriTheme(): KarigiriTheme {
  const context = useContext(KarigiriThemeContext)
  if (!context) {
    throw new Error('useKarigiriTheme must be used within a KarigiriProvider')
  }
  return context
} 