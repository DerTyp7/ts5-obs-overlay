import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@styles": "/src/styles",
      "@assets": "/src/assets",
      "@interfaces": "/src/interfaces",
      "@utils": "/src/utils",
    },
  },
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false })],
})