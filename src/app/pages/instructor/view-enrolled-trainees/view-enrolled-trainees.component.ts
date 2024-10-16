import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Location, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-view-enrolled-trainees',
  standalone: true,
  imports: [MatButtonModule, MatTableModule,MatIconModule,MatFormFieldModule,MatInputModule, MatProgressBarModule, NgIf],
  templateUrl: './view-enrolled-trainees.component.html',
  styleUrl: './view-enrolled-trainees.component.css'
})
export class ViewEnrolledTraineesComponent implements OnInit {
  trainees: any[] = [];
  traineesToDisplay: any[] = [];
  user:any
  toggle=false
  displayedColumns: string[] = ["Sl No", 'Full Name', 'Email', 'Points', 'actions'];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private login: LoginService, private snack: MatSnackBar, private location:Location) { }

  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.userService.getTraineesInBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.trainees = data
        this.traineesToDisplay=data
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  removeTrainee(id:any){
    this.toggle=true
    this.userService.removeTraineeFromBatch(this.route.snapshot.paramMap.get('id'),id).subscribe(
      (data:any)=>{
        this.trainees = this.trainees.filter((batch:any)=> batch.id!=id)
        this.traineesToDisplay = this.traineesToDisplay.filter((batch:any)=> batch.id!=id)
        this.snack.open("Trainee Removed from batch successfully!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        this.toggle=false
      },(error)=>{
        this.toggle=false
        this.snack.open("Internal server error", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    )
  }
  goBack(){
    this.location.back()
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.traineesToDisplay = this.trainees;
      return;
    }
    this.traineesToDisplay = this.trainees.filter(
      (sprint:any) => sprint?.fullName.toLowerCase().includes(text.toLowerCase())
    );
  }

  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }

  goToAddTrainee(){
    this.router.navigate([`${this.route.snapshot.paramMap.get('id')}/add-trainees`])
  }
  
}
