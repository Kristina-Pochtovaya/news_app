import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Можно попробовать добавить алиасы, чтобы явно указать путь и избежать путаницы
    alias: {
      '@': '/src',
    },
  },
})
