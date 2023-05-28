import {createRouter, createWebHistory} from "vue-router";
import FourOhFourView from "@/views/FourOhFourView.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AboutView from "@/views/AboutView.vue";
import SignInUpView from "@/views/SignInUpView.vue";
import {getCookie} from "../components/composables/GetCookie";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/search',
        name: 'Search',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
    },
    {
        path: '/login',
        name: 'Login',
        component: SignInUpView,
    },
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
        if (to.name === "Search") {
            const top = document.getElementById("triangle-down")?.getBoundingClientRect()?.top ??
              document.body.scrollHeight + window.scrollY
            setTimeout(() => window.scrollTo({ top, behavior: "smooth" }), 250)
            return;
        }
        if (to.name === from.name) {
            return { top: 0, behavior: "smooth" }
        }
        return { top: 0, behavior: "auto" };
    }
})

router.beforeEach((to, from) => {
    if (!getCookie("noxtoon-session") && to.path != "/login") {
        router.push({ path: "/login"})
    }
})

router.afterEach((to, from) => {
    document.title = (to.name) ? `Noxtoon -  ${String(to.name)}` : "Noxtoon";
});

export default router
