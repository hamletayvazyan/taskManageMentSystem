import VueRouter from 'vue-router';
window.Vue.use(VueRouter);
import Vuex from 'vuex'
import 'es6-promise/auto'

window.Vue.use(Vuex);
import {allRoutes} from "./router-register";

/**
 * register all routes and guards
 * */
const routes = allRoutes;
const router = new VueRouter({
    routes,
    linkExactActiveClass: 'active',
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    store.commit('checkFortToken');
    let routeNames = [
        'login',
        'register',
        'home',
        'tasks.show',
        'search',
    ];
    if (store.state.isLoggedIn) {
        if (to.name === 'login' || to.name === 'register') next({name: 'tasks'})
        next()
    } else {
        const checkRoute = routeNames.filter(i => i === to.name);
        if (checkRoute.length === 0) next({name: 'home'});
        next()
    }
});

/**
 * global state settings
 * */
const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        userDetails: {},
        loading: false,
        alertVariant: 'success',
        alertDismissSecs: 4,
        alertDismissCountDown: 0,
        alertShowDismissibleAlert: false,
        message: '',
    },
    mutations: {
        checkFortToken (state) {
            const token = localStorage.getItem('token');
            state.isLoggedIn = !!token;
        },
        userDetails (state) {
            const user = localStorage.getItem('user');
            state.userDetails = JSON.parse(user);
        },
        loading (state, canLoad) {
            state.loading = canLoad;
        },
        newMessage (state, message) {
            state.message = message;
        },
        showAlert (state, variant) {
            state.alertDismissCountDown = state.alertDismissSecs;
            state.alertVariant = variant;
        }
    }
});


new Vue({ router, store, el: '#app' }).$mount('#app');
