import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { BatchService } from '../../../services/batch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-update-batch',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,FormsModule],
  templateUrl: './update-batch.component.html',
  styleUrl: './update-batch.component.css'
})
export class UpdateBatchComponent implements OnInit {
  batch: any = []
  constructor(private login:LoginService, private batchService: BatchService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.batchService.getBatchById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.batch= data
      console.log(this.batch)
    },(error)=>{
      window.alert(error)
    })
  }

  formSubmit(){
    this.batchService.UpdateBatch(this.route.snapshot.paramMap.get('id'),this.batch).subscribe(
      (data:any)=>{
        window.alert("success")
      },
      (error)=>{
        window.alert("fail")
      }
    )
  }

}
