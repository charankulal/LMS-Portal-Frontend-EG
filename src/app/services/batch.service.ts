import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  constructor(private http: HttpClient) { }

  //create a new batch
  public createBatch(batchData:any, requestOptions:any)
  {
    return this.http.post(`${baseUrl}/api/batches/create-batch`,batchData,requestOptions)
  } 


  // get all the batches created by specific instructor using id
  public getAllBatchesCreatedByInstructor(id:any){
    return this.http.get(`${baseUrl}/api/batches/${id}/batches`)
  }


  // get specific batch by using id
  public getBatchById(id:any){
    return this.http.get(`${baseUrl}/api/batches/${id}`)
  }

  // get user details
  public getUser()
  {
    let userString=window.localStorage.getItem('user')
    // console.log(userString)
    if(userString!=null)
    {
      return JSON.parse(userString)
    }
    else
    {
      return null
    }
  }

  //Delete the batch by id
  public deleteBatch(id:any, requestOptions:any){
    return this.http.delete(`${baseUrl}/api/batches/${id}`,requestOptions)
  }

  // Update the batch by id
  public UpdateBatch(id:any,data:any){
    return this.http.put(`${baseUrl}/api/batches/${id}`,data)
  }

  // get all batches
  public getAllBatches(){
    return this.http.get(`${baseUrl}/api/batches`)
  }
}
