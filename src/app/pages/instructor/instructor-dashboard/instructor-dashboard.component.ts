import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BatchService } from '../../../services/batch.service';
import { CertificateService } from '../../../services/certificate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,MatSidenavModule,MatListModule, RouterLink],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent implements OnInit {
  totalBatches:any;
  totalInstructors:any
  totalTrainees:any
  totalCertificates:any

  constructor(public login:LoginService,private router:Router, private route: ActivatedRoute, private batchService:BatchService, private certificateService:CertificateService, private snack: MatSnackBar,private userService:UserService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!this.login.isLoggedIn() || this.login.getUserRole()!="Instructor"||id!=this.login.getUser().id)
    {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.batchService.getAllBatchesCreatedByInstructor(id).subscribe((data:any)=>{
      this.totalBatches= data.length;
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

  createBatch(){
    this.router.navigate([`/create-batch`])
  }

  viewAllBatches(){
    this.router.navigate(["/view-all-batches"])
  }
}
