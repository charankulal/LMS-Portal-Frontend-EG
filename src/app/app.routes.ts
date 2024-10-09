import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { InstructorDashboardComponent } from './pages/instructor/instructor-dashboard/instructor-dashboard.component';
import { CreateBatchComponent } from './pages/instructor/create-batch/create-batch.component';
import { ViewAllBatchesComponent } from './pages/instructor/view-all-batches/view-all-batches.component';
import { ViewBatchComponent } from './pages/batch/view-batch/view-batch.component';
import { CreateTraineeComponent } from './pages/admin/create-trainee/create-trainee.component';
import { ViewTraineesComponent } from './pages/admin/view-trainees/view-trainees.component';
import { CreateSprintComponent } from './pages/sprint/create-sprint/create-sprint.component';
import { UpdateBatchComponent } from './pages/instructor/update-batch/update-batch.component';
import { ViewSprintsComponent } from './pages/sprint/view-sprints/view-sprints.component';
import { ViewSprintComponent } from './pages/sprint/view-sprint/view-sprint.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin-dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'instructor-dashboard/:id', component: InstructorDashboardComponent, pathMatch: 'full' },
  { path: 'create-batch', component: CreateBatchComponent, pathMatch: 'full' },
  { path: 'view-all-batches', component: ViewAllBatchesComponent, pathMatch: 'full' },
  { path: 'batch/:id', component: ViewBatchComponent, pathMatch: 'full' },
  { path: 'create-trainee', component: CreateTraineeComponent, pathMatch: 'full' },
  { path: 'view-all-trainees', component: ViewTraineesComponent, pathMatch: 'full' },
  { path: 'create-sprint/:id', component: CreateSprintComponent, pathMatch: 'full' },
  { path: 'update-batch/:id', component: UpdateBatchComponent, pathMatch: 'full' },
  { path: 'view-all-sprints/:id', component: ViewSprintsComponent, pathMatch: 'full' },
  { path: 'view-sprint/:id', component: ViewSprintComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }