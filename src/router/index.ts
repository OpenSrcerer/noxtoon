import {createRouter, createWebHistory} from "vue-router";
import FourOhFourView from "@/views/FourOhFourView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: FourOhFourView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router