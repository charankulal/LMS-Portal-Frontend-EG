import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../services/batch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';
import { SprintService } from '../../../services/sprint.service';
import { UserService } from '../../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-batch',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './view-batch.component.html',
  styleUrl: './view-batch.component.css'
})
export class ViewBatchComponent implements OnInit {
  batch: any = []
  totalSprints:any
  enrolledTrainees:any
  user:any
  constructor(private batchService: BatchService, private route: ActivatedRoute, private login: LoginService, private router: Router, private sprintService:SprintService, private userService:UserService, private location:Location) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.batch = data;
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );

    this.sprintService.getAllSprintsByBatch(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.totalSprints=data
    },(error) => {
      console.error('Error fetching batches:', error);
    })

    this.userService.getTraineesInBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.enrolledTrainees = data
      },
      (error) => {
        console.error('Error fetching Trainees:', error);
      }
    );

  }

  createSprint() {
    this.router.navigate([`create-sprint/${this.route.snapshot.paramMap.get('id')}`])
  }

  viewAllSprints(){
    this.router.navigate([`view-all-sprints/${this.route.snapshot.paramMap.get('id')}`])
  }

  addTrainees(){
    this.router.navigate([`${this.route.snapshot.paramMap.get('id')}/add-trainees`])
  }

  viewEnrolledTrainees(id:any){
    this.router.navigate([`${id}/view-trainees`])
  }

  goBack(){
    this.location.back()
  }

  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }
}
