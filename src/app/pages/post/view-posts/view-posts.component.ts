import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-posts',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,NgFor],
  templateUrl: './view-posts.component.html',
  styleUrl: './view-posts.component.css'
})
export class ViewPostsComponent implements OnInit {
  posts: any
  sprint: any

  constructor(private router: Router, private route: ActivatedRoute, private sprintService: SprintService, private postService: PostService, private login: LoginService, private snack: MatSnackBar) { }
  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    // fetch sprint name
    this.sprintService.getSprintById(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.sprint=data[0].name
    },(error)=>{
      console.log(error)
    })

    // fetch posts by sprint id
    this.postService.getPostBySprintId(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.posts=data
      console.log(this.posts)
    },(error)=>{
      console.log(error)
    })
  }
  updatePost(id:any){
    this.router.navigate([`update-post/${id}`])
  }

  deletePost(id:any){
    this.postService.deletePostById(id).subscribe((data:any)=>{
      this.posts = this.posts.filter((post:any)=> post.contentId!=id)
      this.snack.open("Post Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      window.alert("error")
    })
  }
}
