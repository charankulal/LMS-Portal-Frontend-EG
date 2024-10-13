import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BatchService } from '../../../services/batch.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { Location, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-view-all-batches',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule,MatCardModule,NgFor,MatIconModule,MatFormFieldModule,MatInputModule,MatTooltipModule],
  templateUrl: './view-all-batches.component.html',
  styleUrl: './view-all-batches.component.css'
})
export class ViewAllBatchesComponent implements OnInit{
  batches: any[] = [];
  batchesToDisplay:any[]=[]
  constructor(private batchService: BatchService,private snack:MatSnackBar, private router: Router,private  login:LoginService, private location:Location) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    const id= this.batchService.getUser().id
    this.batchService.getAllBatchesCreatedByInstructor(id).subscribe(
      (data: any) => {
        this.batches = data;
        this.batchesToDisplay=data
      },
      (error) => {
        this.snack.open("Internal Sever Error!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    );
  }

  viewBatch(id:any){
    this.router.navigate([`/batch/${id}`])
  }

  updateBatch(id:any){
    this.router.navigate([`update-batch/${id}`])
  }

  deleteBatch(id:any){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Method':'DELETE'
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    this.batchService.deleteBatch(id, requestOptions).subscribe((data:any)=>{
      this.batchesToDisplay = this.batchesToDisplay.filter((batch:any)=> batch.id!=id)
      this.batches = this.batches.filter((batch:any)=> batch.id!=id)
      this.snack.open("Batch Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      this.router.navigate(["/view-all-batches"])
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goToDashboard(){
    this.location.back()
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.batchesToDisplay = this.batches;
      return;
    }
    this.batchesToDisplay = this.batches.filter(
      (batch:any) => batch?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
  goToAnnouncement(id:any){
    this.router.navigate([`announcement/${id}`])
  }
  goToCreateBatch(){
    this.router.navigate([`create-batch`])
  }
  goToAttendance(id:any){
    this.router.navigate([`attendance/${id}`])
  }
}
