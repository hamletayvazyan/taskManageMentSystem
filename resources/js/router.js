import VueRouter from 'vue-router';
window.Vue.use(VueRouter);
import {isLoggedIn, auth_token} from "./enviroment";
let logged = isLoggedIn;
let token = auth_token;
import {allRoutes, } from "./router-register";

const routes = allRoutes;

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'active',
    mode: 'history'
});
router.beforeEach((to, from, next) => {
    console.log(to, logged, (to.name === 'login' && logged));
    switch (true) {
        case to.name === 'login' && logged:
        case to.name === 'register' && logged:
        case to.name === 'reset-password' && logged:
            next({name: 'home'});
            break;
        case to.name === 'login' && !logged:
        case to.name === 'register' && !logged:
        case to.name === 'reset-password' && !logged:
            logged = false;
            token = null;
            next();
            break;
        case to.name === 'tasks' && logged:
            next();
            break;
        case to.name === 'tasks' && !logged:
            next({name: 'login'});
            break;
        default: next()
    }
});
new Vue({
    router,
    el: '#app',
    data: {
        auth_token: logged
    },
}).$mount('#app');
