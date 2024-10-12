import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../../services/sprint.service';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { Location, NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-posts',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,NgFor, MatIconModule,MatFormFieldModule, MatInputModule],
  templateUrl: './view-posts.component.html',
  styleUrl: './view-posts.component.css'
})
export class ViewPostsComponent implements OnInit {
  posts: any
  postsToDisplay:any
  sprint: any

  constructor(private router: Router, private route: ActivatedRoute, private sprintService: SprintService, private postService: PostService, private login: LoginService, private snack: MatSnackBar, private location:Location) { }
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
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })

    // fetch posts by sprint id
    this.postService.getPostBySprintId(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.posts=data
      this.postsToDisplay=data
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  updatePost(id:any){
    this.router.navigate([`update-post/${id}`])
  }

  deletePost(id:any){
    this.postService.deletePostById(id).subscribe((data:any)=>{
      this.posts = this.posts.filter((post:any)=> post.contentId!=id)
      this.postsToDisplay = this.postsToDisplay.filter((post:any)=> post.contentId!=id)
      this.snack.open("Post Deleted successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goBack(){
    this.location.back()
  }
  filterResults(text:string){
    if (text==null || text == '') {
      this.postsToDisplay = this.posts;
      return;
    }
    this.postsToDisplay = this.posts.filter(
      (post:any) => post?.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
