import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-update-sprint',
  standalone: true,
  providers: [provideNativeDateAdapter(),DatePipe],
  imports: [MatButtonModule, MatCardModule,MatFormFieldModule,FormsModule,MatInput,ReactiveFormsModule,MatDatepickerModule],
  templateUrl: './update-sprint.component.html',
  styleUrl: './update-sprint.component.css'
})
export class UpdateSprintComponent implements OnInit {
sprint:any=[]
readonly range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});
constructor(private router:Router, private route:ActivatedRoute, private sprintService:SprintService, private snack:MatSnackBar, private datePipe: DatePipe, private login: LoginService){}
ngOnInit(): void {
  if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
    this.login.logout()
    this.router.navigate(['/login'])
  }

  // fetching the sprint
  this.sprintService.getSprintById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
    this.sprint=data[0]
  },(error)=>{
    console.log(error)
  })
}
formSubmit(){
  this.sprint.from_Day = this.datePipe.transform(this.sprint.from_Day, 'yyyy-MM-dd') || '';
    this.sprint.to_Day = this.datePipe.transform(this.sprint.to_Day, 'yyyy-MM-dd') || ''
this.sprintService.updateSprintById(this.route.snapshot.paramMap.get('id'),this.sprint).subscribe((data:any)=>{
  this.snack.open("Sprint Updated!", 'Ok', {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  })
},(error)=>{
  this.snack.open("Internal Server Error!", 'Ok', {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  })
})
}
}
