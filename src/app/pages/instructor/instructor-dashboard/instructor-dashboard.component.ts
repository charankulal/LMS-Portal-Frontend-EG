import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,MatSidenavModule,MatListModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent implements OnInit {
  
  constructor(public login:LoginService,private router:Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!this.login.isLoggedIn() || this.login.getUserRole()!="Instructor"||id!=this.login.getUser().id)
    {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }

  createBatch(){
    this.router.navigate([`/create-batch`])
  }

  viewAllBatches(){
    this.router.navigate(["/view-all-batches"])
  }
}
