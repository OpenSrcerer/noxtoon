import {createRouter, createWebHistory} from "vue-router";
import FourOhFourView from "@/views/FourOhFourView.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
// import AddAToonView from "@/views/AddAToonView.vue";
// import AboutView from "@/views/AboutView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    // {
    //     path: '/add-a-toon',
    //     name: 'Add A Cartoon',
    //     component: AddAToonView,
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: AboutView,
    // },
    {
        path: '/toon/:slug',
        name: 'Toon Profile',
        component: ProfileView,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
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
router.afterEach((to, from) => {
    document.title = (to.name) ? `Noxtoon -  ${String(to.name)}` : "Noxtoon";
});

export default router