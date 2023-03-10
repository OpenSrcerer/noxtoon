import {createApp} from 'vue'
import App from './App.vue'
import '../public/css/main.css'
import {initializeFirebase} from "@/services/FirebaseClient";
import router from "@/router";

initializeFirebase()
createApp(App).use(router).mount('#app')
