import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { CertificateService } from '../../../services/certificate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-certificate',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './update-certificate.component.html',
  styleUrl: './update-certificate.component.css'
})
export class UpdateCertificateComponent implements OnInit {
  certificate: any=[]
  constructor(private route: ActivatedRoute, private login: LoginService, private router: Router, private certificateService: CertificateService, private snack: MatSnackBar) { }
  
  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    // get certificate by the id
    this.certificateService.getCertificateById(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.certificate = data[0]
      
    }, (error) => {
      console.log(error)
    })
  }
  

  formSubmit() {
    this.certificateService.updateCertificateById(this.route.snapshot.paramMap.get('id'),this.certificate).subscribe((data:any)=>{
      this.snack.open("Certiifcate is Updated", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    },(error)=>{
      this.snack.open("Internal server error", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
}
