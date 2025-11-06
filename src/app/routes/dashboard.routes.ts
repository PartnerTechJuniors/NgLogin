import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'welcome',
      pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadComponent: () => import('@pages/dashboard/welcome-component/welcome-component').then((m) => m.WelcomeComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('@pages/dashboard/users/users').then((m) => m.Users)
    }
];
