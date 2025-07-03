import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable DTS for now due to cross-package imports
  clean: true,
  external: ['react', 'react-dom', '@karigiri-kit/react-theme', '@karigiri-kit/tokens'],
}) 