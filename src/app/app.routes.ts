import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from '@guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [noAuthGuard],
        loadChildren: () => import('@routes/auth.routes').then(m => m.routes)
    },
    {
      path: 'dashboard',
      canActivate: [authGuard],
      loadChildren: () => import('@routes/dashboard.routes').then(m => m.routes)
    }
];
