import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { visualizer } from "rollup-plugin-visualizer";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: "analyze.html", //分析图生成的文件名
    open: true //如果存在本地服务端口，将在打包后自动展示
  }),],
  base: "./",//打包上传服务器的相对路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
