import IndexComponent from "./IndexComponent";
import CreateComponent from "./CreateComponent";
import EditComponent from "./EditComponent";
import ShowComponent from "./ShowComponent";

export const TasksRoutes = [
    {
        path: 'tasks',
        component: IndexComponent,
        name: 'tasks',
        children: [
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
        ]
    },
];
