import AppComponent from "./components/layout/AppComponent";
import NotFound from "./components/NotFound";
import HomeComponent from "./components/HomeComponent";
import {AuthRoutes} from "./routes/auth.routes";
import {TasksRoutes} from "./routes/tasks.routes";
import SearchComponent from "./components/search/SearchComponent";

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
            {
                path: 'search-result',
                component: SearchComponent,
                name: 'search',
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
