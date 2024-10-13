import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from '../../../services/batch.service';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { AttendanceService } from '../../../services/attendance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-attendance',
  standalone: true,
  providers: [provideNativeDateAdapter(),DatePipe],
  imports: [NgFor, FormsModule, DatePipe, NgIf, MatButtonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  update=false
  batches = []; // List of batches
  trainees: any[] = []; // List of trainees for selected batch
  selectedBatchId: number | null = null; // Currently selected batch ID
  currentDate: Date = new Date(); // Current date for attendance marking
  attendanceData:any

  constructor(private login: LoginService, private router: Router, private route: ActivatedRoute, private userService: UserService, private attendanceService: AttendanceService, private snack: MatSnackBar, private datePipe:DatePipe){}

  ngOnInit(): void {
    if (!this.login.isLoggedIn() || this.login.getUserRole() != "Instructor") {
      this.login.logout()
      this.router.navigate(['/login'])
    }
    this.userService.getTraineesInBatch(this.route.snapshot.paramMap.get('id')).subscribe((data:any)=>{
      this.trainees=data
    })

  }
  toggleAttendance(trainee: any) {

    trainee.remarks = trainee.remarks === 'Present' ? 'Absent' : 'Present';

  }
  markAttendance(trainee:any){
    if(trainee.remarks==null || trainee.remarks =='')
    {
      trainee.remarks="Absent"
    }
    const attendanceData = {
      batchId: this.route.snapshot.paramMap.get('id'), 
      userId: trainee.id,
      date: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
      remarks: trainee.remarks
    };
    this.attendanceService.saveOrEditAttendance(attendanceData).subscribe((data:any)=>{
      this.snack.open("Attendance Saved successfully", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
      
    },(error)=>{
      console.log(error)
      this.snack.open("Internal Server error", 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
    })
  }
  downloadCSV() {
    const csvRows = [];
    // Add headers to the CSV
    const headers = ['Trainee Name', 'Batch ID', 'Date', 'Attendance Remarks'];
    csvRows.push(headers.join(','));
    
    // Add each trainee's attendance data
    this.trainees.forEach(trainee => {
      const row = [
        trainee.fullName,
        this.route.snapshot.paramMap.get('id'),
        this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'),
        trainee.remarks
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `attendance-report-${this.currentDate}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  loadAttendanceFromLocalStorage() {
    const storedAttendance = localStorage.getItem('attendanceData');
    if (storedAttendance) {
      const attendanceData = JSON.parse(storedAttendance);
      attendanceData.forEach((storedTrainee: any) => {
        const trainee = this.trainees.find(t => t.id === storedTrainee.userId);
        if (trainee) {
          trainee.remarks = storedTrainee.remarks;
        }
      });
      return attendanceData
    }
    return null
  }
}
