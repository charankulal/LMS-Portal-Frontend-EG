import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  post: any = []
  user: any
  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService, private login: LoginService, private snack: MatSnackBar, private location: Location) { }
  ngOnInit(): void {
    // login and role validation : use login service

    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }

    // fetch post by id
    this.postService.getPostById(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      this.post = data[0]
    }, (error) => {
      this.snack.open("Internal Sever Error!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }

  formSubmit() {
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
    this.postService.updatePostById(this.route.snapshot.paramMap.get('id'), this.post).subscribe((data: any) => {
      this.snack.open(" Post Updated!", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      this.location.back()
    }, (error) => {
      this.snack.open("Internal Server Error! Try Again", 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  goBack() {
    this.location.back()
  }

  goToDashboard() {
    this.user = this.login.getUser()
    this.router.navigate([`instructor-dashboard/${this.user.id}`])
  }
}
