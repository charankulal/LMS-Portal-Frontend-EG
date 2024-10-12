import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-trainees',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, JsonPipe, MatCardModule,FormsModule,MatFormFieldModule, MatInputModule, MatIconModule,RouterLink],
  templateUrl: './view-trainees.component.html',
  styleUrl: './view-trainees.component.css'
})
export class ViewTraineesComponent implements OnInit {
  trainees: any[] = [];
  traineesToDisplay:any[]=[]
  displayedColumns: string[] = ["Sl No", 'Full Name', 'Password', 'Email', 'Points', 'actions'];
  constructor(private login: LoginService, private router: Router, private userservice: UserService, private snack:MatSnackBar) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    this.userservice.getAllTrainees().subscribe(
      (data: any) => {
        this.trainees = data;
        this.traineesToDisplay=data
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  updateTrainee(id:any){
    this.router.navigate([`update-trainee/${id}`])
  }

  deleteTrainee(id:any){
    this.userservice.deleteTrainee(id).subscribe((data:any)=>{
      this.traineesToDisplay = this.traineesToDisplay.filter((trainee:any)=> trainee.id!=id)
      this.trainees = this.trainees.filter((trainee:any)=> trainee.id!=id)
      this.snack.open("Trainee Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      this.snack.open("Internal server Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goToDashboard(){
    this.router.navigate(['admin-dashboard'])
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.traineesToDisplay = this.trainees;
      return;
    }
    this.traineesToDisplay = this.trainees.filter(
      trainee => trainee?.fullName.toLowerCase().includes(text.toLowerCase())
    );
  }
}

