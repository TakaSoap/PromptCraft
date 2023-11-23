// https://nuxt.com/docs/api/configuration/nuxt-config

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
    app: { pageTransition: { name: 'page', mode: 'out-in' } },
    devtools: { enabled: false },
    vite: {
        plugins: [
            AutoImport({
                imports: [
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ]
            }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    },
    modules: ['@pinia/nuxt'],
    ssr: false
});
