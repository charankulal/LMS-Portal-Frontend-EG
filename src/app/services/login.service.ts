import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {  }

  public loginStatusSubject=new Subject<boolean>();

  public getCurrentUser(requestHeader:any,email:any)
  {
    return this.http.get(`${baseUrl}/api/users/email?email=${email}`,requestHeader)
  }

  // login post request
  public loginPostRequest(loginData:any)
  {
    return this.http.post(`${baseUrl}/api/authorize/login`,loginData)
  }

  //login user : store the token in localstorage

  public loginUser(token:any)
  {
    window.localStorage.setItem('token',token)

    return true;
  }

  // TO check whether use is  loggedin or not
  public isLoggedIn()
  {
    let tokenString= window.localStorage.getItem('user')
    if(tokenString== undefined || tokenString==''|| tokenString==null)
    {
      return false
    }
    else{
      return true
    }
  }

  // To logout: remove token from localstorage
  public logout()
  {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    return true
  }

  //to get token
  public getToken()
  {

    return window.localStorage.getItem('token')
  }

  //set user detail
  public setUser(user:any)
  {
    window.localStorage.setItem('user',JSON.stringify(user))

  }

  //get user detail
  public getUser()
  {
    let userString=window.localStorage.getItem('user')
    // (userString)
    if(userString!=null)
    {
      return JSON.parse(userString)
    }
    else
    {
      this.logout()
      return null
    }
  }

  //get user role or authority
  public getUserRole()
  {
    let user=this.getUser()
    return user.role
  }
}
