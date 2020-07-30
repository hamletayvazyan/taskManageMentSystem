import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ResetPasswordComponent from "./ResetPasswordComponent";

export const AuthRoutes = [
    {
        path: 'login',
        component: LoginComponent,
        name: 'login',
    },
    {
        path: 'register',
        component: RegisterComponent,
        name: 'register',
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        name: 'reset-password',
    },
];



