import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import router from './router'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiPencilFill, BiTrash3Fill } from "oh-vue-icons/icons";

// Agregar íconos específicos
addIcons(BiPencilFill, BiTrash3Fill);

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia)

// Registra el componente 'OhVueIcon' globalmente
app.component('v-icon', OhVueIcon)

app.mount('#app')
