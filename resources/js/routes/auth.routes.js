import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import ResetPasswordComponent from "../components/auth/ResetPasswordComponent";

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
    }
];



