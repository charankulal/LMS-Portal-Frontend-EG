import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { BatchService } from '../../../services/batch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-batch',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,FormsModule, MatIconModule],
  templateUrl: './update-batch.component.html',
  styleUrl: './update-batch.component.css'
})
export class UpdateBatchComponent implements OnInit {
  batch: any = []
  user:any
  constructor(private login:LoginService, private batchService: BatchService,private router:Router,private route:ActivatedRoute, private snack : MatSnackBar, private location:Location){}
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.batch= data
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }

  formSubmit(){
    this.batchService.UpdateBatch(this.route.snapshot.paramMap.get('id'),this.batch).subscribe(
      (data:any)=>{
        this.snack.open("Batch Details are updated", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        this.router.navigate([`view-all-batches`])
      },
      (error)=>{
        this.snack.open("Internal Sever Error!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    )
  }

  goBack(){
    this.location.back()
  }
  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }
}
