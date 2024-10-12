import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-instructor',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './update-instructor.component.html',
  styleUrl: './update-instructor.component.css'
})
export class UpdateInstructorComponent implements OnInit{
  userData={
    fullName:'',
    password:'',
    email:'',
    role:'Instructor',
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
    console.log(this.userData)
  },(error)=>{
    console.log(error)
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
  
  this.userService.updateInstructor(this.route.snapshot.paramMap.get('id'),this.userData).subscribe(
    (data:any)=>{
      this.snack.open("Instructor Details updated successfully!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      this.router.navigate(['view-all-instructors'])
    },(error)=>{
      alert(error)
    }
  )
}
goBack(){
this.location.back()
}
}
