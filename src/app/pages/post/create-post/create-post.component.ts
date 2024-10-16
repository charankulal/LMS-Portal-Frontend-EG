import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../services/login.service';
import { SprintService } from '../../../services/sprint.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  user:any
  constructor(private router:Router, private postService:PostService, private login:LoginService, private route: ActivatedRoute, private snack: MatSnackBar, private location:Location){}
  post={
    sprintId:this.route.snapshot.paramMap.get('id'),
    title:'',
    description:''
  }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }

  formSubmit(){
    if (this.post.title.trim() == '' || this.post.title == null) {
      this.snack.open("Name is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (this.post.description.trim() == '' || this.post.description == null) {
      this.snack.open("Description is required!!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    this.postService.createPost(this.post).subscribe((data:any)=>{
      this.snack.open("New Post Created!", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      //TODO: send to view all post 
    },(error)=>{
      this.snack.open("Internal Server Error", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
  })
  }
  goBack(){
    this.location.back()
  }
  goToDashboard(){
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }
}
