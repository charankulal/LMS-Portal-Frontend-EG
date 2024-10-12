import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BatchService } from '../../../services/batch.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CertificateService } from '../../../services/certificate.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatSidenavModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalBatches:any
  totalTrainees:any
  totalInstructors:any
  totalCertificates:any
  constructor(public login: LoginService, private router: Router, private batchService: BatchService, private userService: UserService, private snack:MatSnackBar, private certificateService:CertificateService) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    this.batchService.getAllBatches().subscribe((data:any)=>{
      this.totalBatches= data.length;
    },(error)=>{
      this.snack.open("Error in fetching data!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })

    this.userService.getAllInstructors().subscribe((data:any)=>{
      this.totalInstructors=data.length
    },(error)=>{
      this.snack.open("Error in fetching data!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })

    this.userService.getAllTrainees().subscribe((data:any)=>{
      this.totalTrainees=data.length
    },(error)=>{
      this.snack.open("Error in fetching data!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })

    this.certificateService.getAllCertificates().subscribe((data:any)=>{
      this.totalCertificates=data.length
    },(error)=>{
      this.snack.open("Error in fetching data!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
}

