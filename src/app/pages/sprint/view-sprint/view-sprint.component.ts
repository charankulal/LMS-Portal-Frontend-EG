import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SprintService } from '../../../services/sprint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { error } from 'console';
import { BatchService } from '../../../services/batch.service';

@Component({
  selector: 'app-view-sprint',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './view-sprint.component.html',
  styleUrl: './view-sprint.component.css'
})
export class ViewSprintComponent implements OnInit {
  sprint: any
  batch: any

  constructor(private sprintService: SprintService, private snack: MatSnackBar, private router: Router, private login: LoginService, private route: ActivatedRoute, private batchService: BatchService) { }
  ngOnInit(): void {
    // login and role validation : use login service
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    // fetch sprint by sprint id
    this.sprintService.getSprintById(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.sprint = data[0]
    }, (error) => {
      console.log(error)
    })
  }
  createPost() {
    this.router.navigate([`${this.sprint.id}/create-post`]);
  }
  viewAllPosts() {
    this.router.navigate([`${this.sprint.id}/view-posts`]);
  }
  createCertification() {
    this.router.navigate([`${this.sprint.id}/create-certificate`]);
  }

  viewCertification(){
    this.router.navigate([`${this.sprint.id}/view-certificates`]);
  }

}
