import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true, // Tokens can have DTS since it's the base package
  clean: true,
  external: [],
}) 