/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, import/no-duplicates, import/no-self-import, import/no-relative-packages */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// 如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式。
import 'element-plus/es/components/message/style/css';

import './assets/main.css';
import 'uno.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
