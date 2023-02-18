/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, import/no-duplicates, import/no-self-import, import/no-relative-packages */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import 'uno.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
