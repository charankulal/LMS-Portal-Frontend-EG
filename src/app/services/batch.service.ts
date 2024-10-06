import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  constructor(private http: HttpClient) { }

  public createBatch(batchData:any, requestOptions:any)
  {
    return this.http.post(`${baseUrl}/api/batches/create-batch`,batchData,requestOptions)
  } 

  public getAllBranchesCreatedByInstructor(id:any){
    return this.http.get(`${baseUrl}/api/batches/${id}/batches`)
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
}
