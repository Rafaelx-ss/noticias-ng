import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { authGuard } from './guards/auth.guard';
import { Userscrud } from './userscrud/userscrud';

export default [
    { 
        path: 'documentation', 
        component: Documentation,
        canActivate: [authGuard]
    },
    { 
        path: 'crud', 
        component: Crud,
        canActivate: [authGuard]
    },
    { 
        path: 'userscrud', 
        component: Userscrud,
        canActivate: [authGuard]
    },
    { 
        path: 'empty', 
        component: Empty,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
