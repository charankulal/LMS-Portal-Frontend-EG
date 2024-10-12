import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BatchService } from '../../../services/batch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-batch',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-batch.component.html',
  styleUrl: './create-batch.component.css'
})
export class CreateBatchComponent implements OnInit {
  batchData = {
    name: '',
    instructorId: '',
    description: '',
  };
  constructor(public login: LoginService, private router: Router, private batchService: BatchService, private snack: MatSnackBar, private location:Location) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

  }

  formSubmit() {
    if (this.batchData.name.trim() == '' || this.batchData.name == null) {
      this.snack.open("Name is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (this.batchData.description.trim() == '' || this.batchData.description == null) {
      this.snack.open("Description is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Method':'POST'
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };

    const id = this.login.getUser().id
    this.batchData.instructorId = id;

    this.batchService.createBatch(this.batchData, requestOptions).subscribe(
      (data: any) => {
        this.snack.open("New Batch is created!!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        
       this.router.navigate([`/batch/${data.id}`])
      }, (error) => {
        this.snack.open("Internal Server Error!! Try Again", 'OK', {
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
}
