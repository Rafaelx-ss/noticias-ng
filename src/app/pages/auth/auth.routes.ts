import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Register } from './register';
import { publicGuard } from '../guards/auth.guard';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { 
        path: 'login', 
        component: Login,
        canActivate: [publicGuard]
    },
    { 
        path: 'register', 
        component: Register,
        canActivate: [publicGuard]
    }
] as Routes;
