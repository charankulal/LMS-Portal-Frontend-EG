import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule,MatSidenavModule,MatListModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {

}
