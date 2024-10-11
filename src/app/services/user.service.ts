import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // create new user
  public createUser(userData:any){
    return this.http.post(`${baseUrl}/api/users/create`,userData)
  }

  // get all trainees
  public getAllTrainees()
  {
    return this.http.get(`${baseUrl}/api/users/trainees`)
  }

  // get trainee by id
  public getTraineeById(id:any){
    return this.http.get(`${baseUrl}/api/users/get-user/${id}`)
  }

  // add trainees to the batch
  public addTraineeToBatch(batchId:any, userId:any){
    return this.http.post(`${baseUrl}/api/batches/add-trainee/${userId}/batch/${batchId}`,{})
  }

  // view all trainees enrolled in the batch
  public getTraineesInBatch(batchId:any){
    return this.http.get(`${baseUrl}/api/batches/view-trainee/batch/${batchId}`)
  }

  // fetch trainees who are not enrolled in current batch
  public getTraineesNotInBatch(batchId:any){
    return this.http.get(`${baseUrl}/api/batches/fetch-trainee/batch/${batchId}`)
  }

  // remove trainee from the batch
  public removeTraineeFromBatch(batchId:any,id:any){
    return this.http.delete(`${baseUrl}/api/batches/remove-trainee/batch/${batchId}/trainee/${id}`)
  }

  // update trainee
  public updateTrainee(id:any, data:any){
    return this.http.put(`${baseUrl}/api/users/${id}`,data)
  }

  // update instructor
  public updateInstructor(id:any, data:any){
    return this.http.put(`${baseUrl}/api/users/${id}`,data)
  }

  // delete trainee
  public deleteTrainee(id:any){
    return this.http.delete(`${baseUrl}/api/users/${id}`)
  }

  // delete instructor
  public deleteInstructor(id:any){
    return this.http.delete(`${baseUrl}/api/users/${id}`)
  }

  // get all instructors
  public getAllInstructors(){
  return this.http.get(`${baseUrl}/api/users/instructors`)
  }
}
