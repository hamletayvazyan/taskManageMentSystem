import AppComponent from "./components/layout/AppComponent";
import NotFound from "./components/NotFound";
import HomeComponent from "./components/HomeComponent";
import {AuthRoutes} from "./components/auth/auth.routes";
import {TasksRoutes} from "./components/tasks/tasks.routes";

const routes = [
    {
        path: '/',
        component: AppComponent,
        name: 'app',

        children: [
            {
                path: '',
                component: HomeComponent,
                name: 'home',
            },
        ]
    },
    {
        path: '*',
        component: NotFound
    },
];
AuthRoutes.map((i) => {
    routes[0].children.push(i)
});
TasksRoutes.map((i) => {
    routes[0].children.push(i)
});
export const allRoutes = routes;
