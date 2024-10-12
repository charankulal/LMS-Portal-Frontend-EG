import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-all-instructors',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,FormsModule,MatFormFieldModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './view-all-instructors.component.html',
  styleUrl: './view-all-instructors.component.css'
})
export class ViewAllInstructorsComponent implements OnInit {
  instructors: any[] = [];
  instructorsToDisplay: any[]=[]

  displayedColumns: string[] = ["Sl No", 'Full Name', 'Password', 'Email',  'actions'];
  constructor(private login: LoginService, private router: Router, private userservice: UserService, private snack:MatSnackBar) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    this.userservice.getAllInstructors().subscribe(
      (data: any) => {
        this.instructors = data;
        this.instructorsToDisplay=data
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  updateInstructor(id:any){
    this.router.navigate([`update-instructor/${id}`])
  }

  deleteInstructor(id:any){
    this.userservice.deleteInstructor(id).subscribe((data:any)=>{
      this.instructorsToDisplay = this.instructorsToDisplay.filter((instructor:any)=> instructor.id!=id)
      this.instructors = this.instructors.filter((instructor:any)=> instructor.id!=id)
      this.snack.open("Instructor Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      this.snack.open("Internal Server Error!! Try Again", 'OK', {
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
      this.instructorsToDisplay = this.instructors;
      return;
    }
    this.instructorsToDisplay = this.instructors.filter(
      instructor => instructor?.fullName.toLowerCase().includes(text.toLowerCase())
    );
  }
}
