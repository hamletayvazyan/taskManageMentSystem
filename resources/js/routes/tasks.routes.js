import IndexComponent from "../components/tasks/IndexComponent";
import CreateComponent from "../components/tasks/CreateComponent";
import EditComponent from "../components/tasks/EditComponent";
import ShowComponent from "../components/tasks/ShowComponent";

export const TasksRoutes = [
    {
        path: 'tasks',
        component: IndexComponent,
        name: 'tasks',
    },
    {
        path: '/create',
        component: CreateComponent,
        name: 'tasks.create'
    },
    {
        path: '/edit/:id',
        component: EditComponent,
        name: 'tasks.edit'
    },
    {
        path: '/show/:id',
        component: ShowComponent,
        name: 'tasks.show'
    }
];
