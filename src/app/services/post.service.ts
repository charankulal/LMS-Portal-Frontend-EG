import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  // creating new post
  public createPost(post:any){
    return this.http.post(`${baseUrl}/api/posts/create-post`,post)
  }

  // get post by sprint id
  public getPostBySprintId(id:any){
    return this.http.get(`${baseUrl}/api/posts/view-posts/${id}`)
  }
}
