import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

import './style.css'

// * PRIMEVUE
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'

// honarable mantion
const head = createHead();
import 'vue-flux/style.css';

// ? Melakuakn import axios dan menggunakan 
// ? baseURL yang di dapatkan dari config.js
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.baseURL;
axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    ...config.headers,
}

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities, custom-class'
            }
        }
    },
});

app.use(ConfirmationService)
app.use(ToastService)
app.use(createHead())

app.use(createPinia())
app.use(router)

app.mount('#app')
