import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'

  //theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
    //core
import "primevue/resources/primevue.min.css";

createApp(App).use(PrimeVue).use(store).use(router).mount('#app')
