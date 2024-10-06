import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../services/batch.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-batch',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './view-batch.component.html',
  styleUrl: './view-batch.component.css'
})
export class ViewBatchComponent implements OnInit {
  batch:any=[]
  constructor(private batchService: BatchService,private route: ActivatedRoute){}
  ngOnInit(): void {
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
