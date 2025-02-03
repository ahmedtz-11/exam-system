import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '/home/ahmed/Documents/vue-projects/exam-system/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '/home/ahmed/Documents/vue-projects/exam-system/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/home/ahmed/Documents/vue-projects/exam-system/node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

router.afterEach((to) => {
    document.title = `NECTA: ${to.meta.title || 'Home'}`;
  });

app.mount('#app')
