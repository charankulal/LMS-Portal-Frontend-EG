import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-trainee',
  standalone: true,
  imports: [MatFormFieldModule,MatCardModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './update-trainee.component.html',
  styleUrl: './update-trainee.component.css'
})
export class UpdateTraineeComponent implements OnInit{
  userData={
    fullName:'',
    password:'',
    email:'',
    role:'Trainee',
    points:0
  }
  constructor(public login: LoginService, private router: Router, private userService: UserService, private snack: MatSnackBar, private route: ActivatedRoute, private location: Location) { }
ngOnInit(): void {
  if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
    this.login.logout()
    this.router.navigate(['/login'])
  }

  this.userService.getTraineeById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
    this.userData=data
    
  },(error)=>{
    this.snack.open("Internal Sever Error!", 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    })
  })
}

formSubmit(){
  if (this.userData.fullName.trim() == '' || this.userData.fullName == null) {
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
  if (this.userData.email.trim() == '' || this.userData.email == null) {
    this.snack.open("Email is required!!", 'OK', {
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
  if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.userData.email)) {
    this.snack.open("Invalid Email", 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    return;
  }
  
  this.userService.updateTrainee(this.route.snapshot.paramMap.get('id'),this.userData).subscribe(
    (data:any)=>{
      this.snack.open("Trainee updated successfully!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      this.router.navigate(['view-all-trainees'])
    },(error)=>{
      alert(error)
    }
  )
}
goBack(){
  this.location.back()
  }
}
