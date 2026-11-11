
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // EPIC 1 US-01 TASK-07: Przekazywanie żądań API
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:7260',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
