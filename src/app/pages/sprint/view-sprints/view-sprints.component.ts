import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../services/batch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SprintService } from '../../../services/sprint.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-sprints',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './view-sprints.component.html',
  styleUrl: './view-sprints.component.css'
})
export class ViewSprintsComponent implements OnInit {
  displayedColumns: string[] = ["Sl No", "batch name", 'name', 'from_day', 'to_day', 'points', 'actions'];
  sprints: any[]=[]
  sprintsToDisplay:any[] = []
  batch: any
  constructor(private sprintService: SprintService, private snack: MatSnackBar, private router: Router, private login: LoginService, private route: ActivatedRoute, private batchService: BatchService, private location:Location) { }
  user:any
  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    // fetching batch name
    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.batch = data.name;
    }, (error) => {
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
    // fetching datasource

    this.sprintService.getAllSprintsByBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.sprints = data;
        this.sprintsToDisplay=data
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
      this.sprintsToDisplay = this.sprintsToDisplay.filter((sprint:any)=> sprint.id!=id)
      this.snack.open("Sprint Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goBack(){
    this.location.back()
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.sprintsToDisplay = this.sprints;
      return;
    }
    this.sprintsToDisplay = this.sprints.filter(
      (sprint:any) => sprint?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }

}
