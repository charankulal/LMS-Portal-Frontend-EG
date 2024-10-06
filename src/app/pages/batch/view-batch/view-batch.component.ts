import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../services/batch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-view-batch',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './view-batch.component.html',
  styleUrl: './view-batch.component.css'
})
export class ViewBatchComponent implements OnInit {
  batch:any=[]
  constructor(private batchService: BatchService,private route: ActivatedRoute,private login:LoginService,private router:Router){}
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe(
      (data: any) => {
        this.batch = data;
      },
      (error) => {
        console.error('Error fetching batches:', error);
      }
    );

  }
}
