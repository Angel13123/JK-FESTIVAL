import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-dom/client': 'react-dom/client.js'
        }
    },
    build: {
        outDir: 'out',
        emptyOutDir: true
    }
})
