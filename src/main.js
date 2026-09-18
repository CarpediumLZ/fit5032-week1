// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// ---- Firebase ----
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyD_Yd9mR99ssB9ZHzRwBdQmAqENXzMHHq0",
  authDomain: "fit5032-1ed4b.firebaseapp.com",
  projectId: "fit5032-1ed4b",
  storageBucket: "fit5032-1ed4b.firebasestorage.app",
  messagingSenderId: "806947674658",
  appId: "1:806947674658:web:b03690bc97dbe9728d087b"
}

// Initialize Firebase
initializeApp(firebaseConfig)


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
