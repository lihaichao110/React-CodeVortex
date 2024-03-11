import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import requireTransform from 'vite-plugin-require-transform'
import path from "path"

export default defineConfig(({ mode }) => {
  const proxyName = loadEnv(mode, process.cwd()).VITE_APP_API;
  const proxyUrl = loadEnv(mode, process.cwd()).VITE_APP_BASEURL;
  
  return {
    server: {
      proxy: {
        [proxyName]: {
          target: proxyUrl,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(new RegExp(`^${proxyName}`), '')
          }
        }
      }
    },
    base: './',
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import './src/styles/global.scss';
            @import './src/styles/variable.scss';
          `
        }
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        }
      }),
      requireTransform({
        fileRegex:  /.ts$|.tsx$/
      })
    ],
  }
})
