import {createApp} from 'vue'
import App from './App.vue'
import './assets/css/palette.css'
import {initializeFirebase} from "@/services/FirebaseClient";
import router from "@/router";

initializeFirebase()
createApp(App).use(router).mount('#app')
