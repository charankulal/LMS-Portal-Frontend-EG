import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatCardModule,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginData={
    email:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) {}
  ngOnInit(): void {

  }

  formSubmit(){

    // alert("Clicked")
    if(this.loginData.email.trim()=='' || this.loginData.email==null)
    {
      this.snack.open("Email is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',})
        return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open("Password is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',})
        return;
    }
    
    // request to server to generate token
    this.login.loginPostRequest(this.loginData).subscribe(
      (data:any)=>{
        // console.log(data)
        // console.log(data.token)
        let token=data.token
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
        const requestOptions = {
          headers: new Headers(headerDict),
        };
        // login


        this.login.loginUser(token)
        this.login.getCurrentUser(requestOptions).subscribe(
          (user:any)=>{
            this.login.setUser(user)
            // console.log(user)
            // console.log("Success")
            //redirect if user is admin redirect to admin dashboard
            //redirect if user is normal user then redirect to user dashboard

            if(this.login.getUserRole()=="ADMIN")
            {
              // route to admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['/admin'])
              this.login.loginStatusSubject.next(true)
            }
            else if(this.login.getUserRole()=="NORMAL")
            {
              // route to users dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate(['/user-dashboard/0'])
              this.login.loginStatusSubject.next(true)
            }
            else
            {
              // If user is neither admin nor user then logout
              this.login.logout()
            }

          },

        )



      },(error)=>{
        // alert("Error occurred")
        this.snack.open("Invalid Credentials!! Try Again",'OK',{
          duration:3000,
          verticalPosition:'bottom',
          horizontalPosition:'center',})
      }
    )

  }

}