import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../services/batch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SprintService } from '../../../services/sprint.service';

@Component({
  selector: 'app-view-sprints',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './view-sprints.component.html',
  styleUrl: './view-sprints.component.css'
})
export class ViewSprintsComponent implements OnInit {
  displayedColumns: string[] = ["Sl No", "batch name", 'name', 'from_day', 'to_day', 'points', 'actions'];
  sprints: any
  batch: any
  constructor(private sprintService: SprintService, private snack: MatSnackBar, private router: Router, private login: LoginService, private route: ActivatedRoute, private batchService: BatchService) { }

  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    // fetching batch name
    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.batch = data.name;
      console.log(this.batch)
    }, (error) => {
      console.error('Error fetching batch', error);
    })
    // fetching datasource

    this.sprintService.getAllSprintsByBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.sprints = data;

      },
      (error) => {
        console.error('Error fetching sprints', error);
      }
    );



  }
  //viewSprint
  viewSprint(id: any) {
    this.router.navigate([`view-sprint/${id}`])
  }

  updateSprint(id: any) {
    this.router.navigate([`update-sprint/${id}`])
  }

  deleteSprint(id: any) {
    this.sprintService.deleteSprintById(id).subscribe((data:any)=>{
      this.sprints = this.sprints.filter((sprint:any)=> sprint.id!=id)
      this.snack.open("Sprint Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      window.alert("error")
    })
  }


}
