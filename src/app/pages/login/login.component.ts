import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }
  ngOnInit(): void {
    this.login.logout()
  }

  formSubmit() {

    // alert("Clicked")
    if (this.loginData.email.trim() == '' || this.loginData.email == null) {
      this.snack.open("Email is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.loginData.email)) {
      this.snack.open("Invalid Email", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    // request to server to log in
    this.login.loginPostRequest(this.loginData).subscribe(
      (data: any) => {

        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
        const requestOptions = {
          headers: new Headers(headerDict),
        };

        this.login.loginUser(this.loginData.email)
        this.login.getCurrentUser(requestOptions, this.loginData.email).subscribe(
          (user: any) => {
            this.login.setUser(user)

            if (this.login.getUserRole() == "Admin") {
              // route to admin dashboard
              this.router.navigate(['/admin-dashboard'])
              this.login.loginStatusSubject.next(true)
            }
            else if (this.login.getUserRole() == "Instructor") {
              // route to users dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate([`/instructor-dashboard/${user.id}`])
              this.login.loginStatusSubject.next(true)
            }
            else {
              // If user is neither admin nor user then logout
              this.login.logout()
            }
          },
        )
      }, (error) => {
        this.snack.open("Invalid Credentials!! Try Again", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    )
  }
}
