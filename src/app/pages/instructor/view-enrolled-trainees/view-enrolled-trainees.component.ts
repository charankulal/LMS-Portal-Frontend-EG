import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-enrolled-trainees',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './view-enrolled-trainees.component.html',
  styleUrl: './view-enrolled-trainees.component.css'
})
export class ViewEnrolledTraineesComponent implements OnInit {
  trainees: any[] = [];
  displayedColumns: string[] = ["Sl No", 'Full Name', 'Password', 'Email', 'Points', 'actions'];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private login: LoginService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.userService.getTraineesInBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.trainees = data
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  removeTrainee(id:any){
    this.userService.removeTraineeFromBatch(this.route.snapshot.paramMap.get('id'),id).subscribe(
      (data:any)=>{
        this.trainees = this.trainees.filter((batch:any)=> batch.id!=id)
        this.snack.open("Trainee Removed from batch successfully!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      },(error)=>{
        this.snack.open("Internal server error", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    )
  }
}
