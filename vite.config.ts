import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from "path"
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    base: './', //打包路径

    //配置插件
    plugins: [
        vue(),
        vueJsx(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
    //配置路径别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    //配置代理
    server: {
        host: 'localhost',
        port: 80,
        proxy: {
            '/api': {
                target: "",	//实际请求地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/getA/, ''),
            },
        }
    },

    // 生产环境打包配置
    //去除 console debugger
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
