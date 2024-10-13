import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatProgressBarModule, MatCardModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit {
  user: any
  toggle: boolean = false
  constructor(private route: ActivatedRoute, private login: LoginService, private postService: PostService, private router: Router, private snack: MatSnackBar, private location: Location) { }
  announcement: any = {
    batchId: this.route.snapshot.paramMap.get('id'),
    subject: '',
    message: ''
  }
  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
  }


  formSubmit() {
    this.toggle = true
    if (this.announcement.subject.trim() == '' || this.announcement.subject == null) {
      this.snack.open("Please enter subject", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    if (this.announcement.message.trim() == '' || this.announcement.message == null) {
      this.snack.open("Please enter message", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      return;
    }
    this.postService.announceToTrainees(this.announcement).subscribe((data: any) => {
      this.snack.open("Message Sent Successfully!", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })

      this.location.back()

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
