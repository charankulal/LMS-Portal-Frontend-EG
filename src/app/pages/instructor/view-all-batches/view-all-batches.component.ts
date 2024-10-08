import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BatchService } from '../../../services/batch.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-view-all-batches',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './view-all-batches.component.html',
  styleUrl: './view-all-batches.component.css'
})
export class ViewAllBatchesComponent implements OnInit{
  batches: any = [];
  
  displayedColumns: string[] = ["Sl No", 'name', 'description','actions'];
  constructor(private batchService: BatchService,private snack:MatSnackBar, private router: Router,private  login:LoginService) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    const id= this.batchService.getUser().id
    this.batchService.getAllBatchesCreatedByInstructor(id).subscribe(
      (data: any) => {
        this.batches = data;
        console.log(this.batches)
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  viewBatch(id:any){
    this.router.navigate([`/batch/${id}`])
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
      this.batches = this.batches.filter((batch:any)=> batch.id!=id)
      this.snack.open("Batch Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      this.router.navigate(["/view-all-batches"])
    },(error)=>{
      window.alert("error")
    })
  }
}
