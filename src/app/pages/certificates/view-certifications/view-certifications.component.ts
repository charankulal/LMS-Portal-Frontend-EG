import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { CertificateService } from '../../../services/certificate.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-certifications',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor],
  templateUrl: './view-certifications.component.html',
  styleUrl: './view-certifications.component.css'
})
export class ViewCertificationsComponent implements OnInit{
  certificates: any
  sprint: any

  constructor(private router: Router, private route: ActivatedRoute, private sprintService: SprintService, private certificateService: CertificateService, private login: LoginService, private snack:MatSnackBar){}
  
  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    // fetch sprint name
    this.sprintService.getSprintById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.sprint=data[0].name
    },(error)=>{
      console.log(error)
    })

    // fetch certificates by sprint id
    this.certificateService.getCertificatesBySprintId(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.certificates=data
      console.log(this.certificates)
    },(error)=>{
      console.log(error)
    })
  }
  updateCertificate(id:any){
    this.router.navigate([`update-certificates/${id}`])
  }

  deleteCertificate(id:any){
    this.certificateService.deleteCertificateById(id).subscribe((data:any)=>{
      this.certificates = this.certificates.filter((batch:any)=> batch.id!=id)
      this.snack.open("Certificate Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      window.alert("error")
    })
  }
}
