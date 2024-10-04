import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

// import { Component } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { BrowserModule } from '@angular/platform-browser';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,  // You can keep this if you're using standalone components
//   imports: [MatCardModule, MatIconModule, BrowserModule, MatGridListModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],  // Corrected typo from styleUrl to styleUrls
// })
// export class DashboardComponent {
//   // Your component logic here
// }
