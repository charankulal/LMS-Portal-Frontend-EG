import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor( private http:HttpClient) { }

  public saveOrEditAttendance(data:any){
    return this.http.post(`${baseUrl}/api/batches/attendance`,data)
  }
}
