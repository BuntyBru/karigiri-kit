import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Disable DTS temporarily due to cross-package dependency issues
  clean: true,
  external: ['react', 'react-dom', '@karigiri-kit/tokens'],
}) 