import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('@pages/auth/login-component/login-component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('@pages/auth/register-component/register-component').then((m) => m.RegisterComponent)
    }
];
