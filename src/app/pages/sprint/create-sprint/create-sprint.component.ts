import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-create-sprint',
  standalone: true,
  providers: [provideNativeDateAdapter(),DatePipe],
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatDatepickerModule, ReactiveFormsModule, JsonPipe, FormsModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-sprint.component.html',
  styleUrl: './create-sprint.component.css'
})
export class CreateSprintComponent implements OnInit {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  

  constructor(private router:Router, private route:ActivatedRoute, private sprintService:SprintService, private snack:MatSnackBar, private datePipe: DatePipe, private login:LoginService){}

  sprint={
    batchId:this.route.snapshot.paramMap.get('id'),
    name:'',
    description:'',
    from_Day:'',
    to_Day:'',
    points:0
  }

  ngOnInit(): void {
    // TODO: login and authorization validation
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }

  formSubmit(){
    this.sprint.from_Day = this.datePipe.transform(this.sprint.from_Day, 'yyyy-MM-dd') || '';
    this.sprint.to_Day = this.datePipe.transform(this.sprint.to_Day, 'yyyy-MM-dd') || ''
    this.sprintService.createSprint(this.sprint).subscribe((data:any)=>{
      this.snack.open("New Sprint Created!", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
      this.router.navigate([`view-all-sprints/${this.route.snapshot.paramMap.get('id')}`])
    },(error)=>{
      this.snack.open("Internal Server Error", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
}
