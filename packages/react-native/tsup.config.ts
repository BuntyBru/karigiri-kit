import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable DTS for now due to cross-package imports
  clean: true,
  external: ['react', 'react-native', '@karigiri-kit/tokens', '@tamagui/core'],
}) 