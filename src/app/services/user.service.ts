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
}
