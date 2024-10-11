import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit{
  post:any=[]
constructor(private router: Router, private route: ActivatedRoute,  private postService: PostService, private login: LoginService,private snack:MatSnackBar){}
ngOnInit(): void {
  // login and role validation : use login service

  if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
    this.login.logout()
    this.router.navigate(['/login'])
  }

  // fetch post by id
  this.postService.getPostById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
    this.post=data[0]
  },(error)=>{
    console.log(error)
  })
}

formSubmit(){
this.postService.updatePostById(this.route.snapshot.paramMap.get('id'),this.post).subscribe((data:any)=>{
  this.snack.open(" Post Updated!", 'Ok', {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  })
},(error)=>{
  this.snack.open("Internal Server Error! Try Again", 'Ok', {
    duration: 3000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
  })
})
}
}
