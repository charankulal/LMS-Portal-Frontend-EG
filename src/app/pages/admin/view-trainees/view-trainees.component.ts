import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { JsonPipe } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-view-trainees',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, JsonPipe],
  templateUrl: './view-trainees.component.html',
  styleUrl: './view-trainees.component.css'
})
export class ViewTraineesComponent implements OnInit {
  trainees: any[] = [];

  displayedColumns: string[] = ["Sl No", 'Full Name', 'Password', 'Email', 'Points', 'actions'];
  constructor(private login: LoginService, private router: Router, private userservice: UserService) { }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Admin") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    this.userservice.getAllTrainees().subscribe(
      (data: any) => {
        this.trainees = data;
        console.log(this.trainees)
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );
  }
}

