import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from "../components/HomeComponent";

Vue.use(Router);

/**
 * Router from Vue. Associate pages with paths.
 * @type {VueRouter}
 */
const router = new Router({
    mode: 'history',
    base: '/tools/search-engine/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeComponent
        },
    ]
});

export default router
