# React + Vite 记账本

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Installation
```bash
# 安装依赖
npm install react-redux @reduxjs/toolkit react-router-dom dayjs classnames antd-mobile axios
```

### 别名路径配置

Webpack 配置别名路径。
```js
// webpack.config.js
module.exports ={
    alias: {
    "@": path.resolve(__dirname,'src'),
    }
}

```


Vite 配置别名路径。

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})

```


配置VSCode别名联想，需要安装craco
```bash
npm install @craco/craco --save-dev
```
修改package.json
```json
{
    "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
}
}
```
新建craco.config.js
```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*":[
                "src/*"
            ]
        }
    }
}
```

### 配置Json-server

```bash
# 安装
npm install json-server -D
```

配置package.json并准备一个json文件（./server/db.json）
```json
"scripts": {
  "server":"json-server ./server/db.json --port 8888"
}
```