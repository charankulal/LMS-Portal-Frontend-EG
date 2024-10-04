import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch:'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'admin-dashboard', component:DashboardComponent,pathMatch:'full'}
    
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }