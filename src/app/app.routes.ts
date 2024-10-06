import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { InstructorDashboardComponent } from './pages/instructor/instructor-dashboard/instructor-dashboard.component';
import { CreateBatchComponent } from './pages/instructor/create-batch/create-batch.component';
import { ViewAllBatchesComponent } from './pages/instructor/view-all-batches/view-all-batches.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin-dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'instructor-dashboard/:id', component: InstructorDashboardComponent, pathMatch: 'full' },
  { path: 'create-batch', component: CreateBatchComponent, pathMatch: 'full' },
  { path: 'view-all-batches', component: ViewAllBatchesComponent, pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }