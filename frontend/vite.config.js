import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js'
  },
  base: '/cinconecta/', 
  // base: '/cinconecta/', 
  // server: {
  //   cors: {
	// 		origin: ['https://cinconecta-client', 'http://localhost:5173','http://cinboraimpactar.cin.ufpe.br'],
	// 		methods: ['GET', 'POST','DELETE'],
	// 		allowedHeaders: ['Content-Type']
	// 	},
  //   allowedHosts: ['cinconecta-client','cinboraimpactar.cin.ufpe.br']   
  // }
  // base: '/',  // ⛔ NÃO usar '/cinconecta/' com Vite em modo dev + proxy
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   strictPort: true,
  //   allowedHosts: ['all', 'cinconecta-client', 'localhost']
  // }
})
