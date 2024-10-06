import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(public login:LoginService,private router:Router) {}
  ngOnInit(): void {
    if(!this.login.isLoggedIn() || this.login.getUserRole()!="Admin")
    {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }
}

