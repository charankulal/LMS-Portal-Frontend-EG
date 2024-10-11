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
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { ViewPostsComponent } from './pages/post/view-posts/view-posts.component';
import { CreateCertificationComponent } from './pages/certificates/create-certification/create-certification.component';
import { ViewCertificationsComponent } from './pages/certificates/view-certifications/view-certifications.component';
import { UpdateCertificateComponent } from './pages/certificates/update-certificate/update-certificate.component';
import { UpdatePostComponent } from './pages/post/update-post/update-post.component';
import { UpdateSprintComponent } from './pages/sprint/update-sprint/update-sprint.component';
import { AddTrainessComponent } from './pages/instructor/add-trainess/add-trainess.component';
import { ViewEnrolledTraineesComponent } from './pages/instructor/view-enrolled-trainees/view-enrolled-trainees.component';
import { UpdateTraineeComponent } from './pages/admin/update-trainee/update-trainee.component';
import { CreateInstructorComponent } from './pages/admin/create-instructor/create-instructor.component';
import { UpdateInstructorComponent } from './pages/admin/update-instructor/update-instructor.component';
import { ViewAllInstructorsComponent } from './pages/admin/view-all-instructors/view-all-instructors.component';

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
  { path: ':id/create-post', component: CreatePostComponent, pathMatch: 'full' },
  { path: ':id/view-posts', component: ViewPostsComponent, pathMatch: 'full' },
  { path: ':id/create-certificate', component: CreateCertificationComponent, pathMatch: 'full' },
  { path: ':id/view-certificates', component: ViewCertificationsComponent, pathMatch: 'full' },
  { path: 'update-certificates/:id', component: UpdateCertificateComponent, pathMatch: 'full' },
  { path: 'update-post/:id', component: UpdatePostComponent, pathMatch: 'full' },
  { path: 'update-sprint/:id', component: UpdateSprintComponent, pathMatch: 'full' },
  { path: ':id/add-trainees', component: AddTrainessComponent, pathMatch: 'full' },
  { path: ':id/view-trainees', component: ViewEnrolledTraineesComponent, pathMatch: 'full' },
  { path: 'update-trainee/:id', component: UpdateTraineeComponent, pathMatch: 'full' },
  { path: 'update-instructor/:id', component: UpdateInstructorComponent, pathMatch: 'full' },
  { path: 'create-instructor', component: CreateInstructorComponent, pathMatch: 'full' },
  { path: 'view-all-instructors', component: ViewAllInstructorsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }