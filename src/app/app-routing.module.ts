import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
// import { InfoCCSComponent } from './info-ccs/info-ccs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Arahkan pengguna ke login saat aplikasi dimulai
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'map-analyst',
    loadChildren: () => import('./map-analyst/map-analyst.module').then( m => m.MapAnalystPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'data',
    loadChildren: () => import('./data/data.module').then(m => m.DataPageModule)
  },
  {
    path: 'maps2',
    loadChildren: () => import('./maps2/maps2.module').then(m => m.Maps2PageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  },
  // { path: 'info-ccs', component: InfoCCSComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
