import { Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { CertificateService } from '../../../services/certificate.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-certifications',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './view-certifications.component.html',
  styleUrl: './view-certifications.component.css'
})
export class ViewCertificationsComponent implements OnInit{
  certificates: any
  certificatesToDisplay: any
  sprint: any

  constructor(private router: Router, private route: ActivatedRoute, private sprintService: SprintService, private certificateService: CertificateService, private login: LoginService, private snack:MatSnackBar, private location:Location){}
  
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
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })

    // fetch certificates by sprint id
    this.certificateService.getCertificatesBySprintId(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.certificates=data
      this.certificatesToDisplay = data
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  updateCertificate(id:any){
    this.router.navigate([`update-certificates/${id}`])
  }

  deleteCertificate(id:any){
    this.certificateService.deleteCertificateById(id).subscribe((data:any)=>{
      this.certificates = this.certificates.filter((certificate:any)=> certificate.id!=id)
      this.certificatesToDisplay = this.certificates.filter((certificate:any)=> certificate.id!=id)
      this.snack.open("Certificate Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      this.snack.open("Internal server error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goBack(){
    this.location.back()
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.certificatesToDisplay = this.certificates;
      return;
    }
    this.certificatesToDisplay = this.certificates.filter(
      (certificate:any) => certificate?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
