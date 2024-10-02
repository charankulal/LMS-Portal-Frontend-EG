import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {  }

  public getCurrentUser(requestHeader:any)
  {
    return this.http.get(`${baseUrl}/current-user`,requestHeader)
  }

  //generate token

  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  //login user : store the token in localstorage

  public loginUser(token:any)
  {
    localStorage.setItem('token',token)

    return true;
  }

  // TO check whether use is  loggedin or not
  public isLoggedIn()
  {
    let tokenString= window.localStorage.getItem('user')
    // console.log("User logged in",tokenString)
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
    // console.log("Inside get Token function")
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
    // console.log(userString)
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
    return user.authorities[0].authority
  }
}
