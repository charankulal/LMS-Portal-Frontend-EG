import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-instructor',
  standalone: true,
  imports: [MatCardModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule, MatSidenavModule, RouterLink, MatProgressBarModule, NgIf],
  templateUrl: './create-instructor.component.html',
  styleUrl: './create-instructor.component.css'
})
export class CreateInstructorComponent implements OnInit{
  toggle:boolean=false
  userData={
    fullname:'',
    password:'',
    email:'',
    role:'Instructor',
    points:0
  }
  constructor(public login: LoginService, private router: Router, private userService: UserService, private snack: MatSnackBar) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

  }

  formSubmit() {
    this.toggle=true
    if (this.userData.fullname.trim() == '' || this.userData.fullname == null) {
      this.snack.open("Name is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (this.userData.password.trim() == '' || this.userData.password == null) {
      this.snack.open("Password is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (this.userData.password.length <8 || 
      !/[A-Za-z]/.test(this.userData.password) ||
      !/[0-9]/.test(this.userData.password) ||     
      !/[!@#$%&*]/.test(this.userData.password) 
  ) {
    this.snack.open("Password must be at least 8 characters long, and include letters, numbers, and special characters.", 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    return;
  }
    if (this.userData.email.trim() == '' || this.userData.email == null) {
      this.snack.open("Email is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    this.userService.createUser(this.userData).subscribe(
      (data: any) => {
        this.snack.open("New Instructor is created!!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        
       this.router.navigate([`/admin-dashboard`])
      }, (error) => {
        this.snack.open("Internal Server Error!! Try Again", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        this.toggle=false
        this.router.navigate(['create-instructor'])
      }
    )
  }
}
