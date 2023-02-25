import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import {initializeFirebase} from "@/services/FirebaseClient";

initializeFirebase()
createApp(App).mount('#app')
