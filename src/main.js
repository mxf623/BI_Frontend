import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

  //theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
    //core
import "primevue/resources/primevue.min.css";

const app=createApp(App)
app.use(PrimeVue)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
