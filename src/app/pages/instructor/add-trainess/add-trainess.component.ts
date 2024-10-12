import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-trainess',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './add-trainess.component.html',
  styleUrl: './add-trainess.component.css'
})
export class AddTrainessComponent implements OnInit {
  trainees: any[] = [];
  traineesToDisplay: any[] = [];
  displayedColumns: string[] = ["Sl No", 'Full Name', 'Password', 'Email', 'Points', 'actions'];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private login: LoginService, private snack: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.userService.getTraineesNotInBatch(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.trainees = data
        this.traineesToDisplay=data
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }

  AddTraineeToBatch(id: any) {
    this.userService.addTraineeToBatch(this.route.snapshot.paramMap.get('id'), id).subscribe((data: any) => {
      this.trainees = this.trainees.filter((trainee: any) => trainee.id != id)
      this.traineesToDisplay = this.traineesToDisplay.filter((trainee: any) => trainee.id != id)
      this.snack.open("Trainee Added to batch successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    }, (error) => {
      this.snack.open("Internal Sever Error!", 'OK', {
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
      this.traineesToDisplay = this.trainees;
      return;
    }
    this.traineesToDisplay = this.trainees.filter(
      (sprint:any) => sprint?.fullName.toLowerCase().includes(text.toLowerCase())
    );
  }

}
