import path from 'path'

import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/*.test.ts']
  },
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'effector-queue',
      fileName: (format) => `effector-queue.${format}.js`
    },
    rollupOptions: {
      external: ['effector']
    }
  }
})
