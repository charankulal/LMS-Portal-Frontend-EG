import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent implements OnInit {
  constructor(private login:LoginService,private router:Router) {}
  ngOnInit(): void {
    if(!this.login.isLoggedIn() || this.login.getUserRole()!="Instructor")
    {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }
}
