import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages 는 https://<계정>.github.io/<저장소>/ 아래에 놓인다.
 * `--mode pages` 로 빌드할 때만 그 경로를 base 로 쓰고, 로컬에서는 루트를 그대로 쓴다.
 */
const PAGES_BASE = '/bridge-zero/'

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? PAGES_BASE : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // 개발 중에는 같은 오리진으로 보낸다. 값은 전부 POST 본문에 실린다.
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
}))
