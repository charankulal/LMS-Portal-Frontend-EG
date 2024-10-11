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
  constructor(public login: LoginService, private router: Router, private userService: UserService, private snack: MatSnackBar, private route: ActivatedRoute) { }
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
  
  this.userService.updateTrainee(this.route.snapshot.paramMap.get('id'),this.userData).subscribe(
    (data:any)=>{
      this.snack.open("Trainee updated successfully!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    },(error)=>{
      alert(error)
    }
  )
}
}
