import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('@routes/auth.routes').then(m => m.routes)
    },
    {
      path: 'dashboard',
      loadComponent: () => import('@pages/dashboard/welcome-component/welcome-component').then(m => m.WelcomeComponent)
    }
];
