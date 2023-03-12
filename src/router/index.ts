import {createRouter, createWebHistory} from "vue-router";
import FourOhFourView from "@/views/FourOhFourView.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/toon/:slug',
        name: 'Profile',
        component: ProfileView,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: FourOhFourView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.name === from.name) {
            return { top: 0, behavior: "smooth" }
        }
        return { top: 0, behavior: "auto" };
    }
})

export default router