import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from '../../../services/certificate.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-certification',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-certification.component.html',
  styleUrl: './create-certification.component.css'
})
export class CreateCertificationComponent implements OnInit {
  user:any
  constructor(private route: ActivatedRoute, private router: Router, private certificateService: CertificateService, private login: LoginService, private snack: MatSnackBar, private location:Location) { }
  certificate = {
    sprintId: this.route.snapshot.paramMap.get('id'),
    name: '',
    description: '',
    points: ''
  }

  ngOnInit(): void {
    // login and role validation : use login service
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }

  formSubmit() {
    this.certificateService.createCertificate(this.certificate).subscribe((data:any)=>{
      this.snack.open("New Certificate Created!", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    },(error)=>{
      this.snack.open("Internal Server Error", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }

  goBack(){
    this.location.back()
  }
  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }
}