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

  // get post by id
  public getPostById(id:any){
    return this.http.get(`${baseUrl}/api/posts/view-post/${id}`)
  }

  // update post by id
  public updatePostById(id:any,data:any){
    return this.http.put(`${baseUrl}/api/posts/update-post/${id}`,data)
  }

  // delete post by id
  public deletePostById(id:any){
    return this.http.delete(`${baseUrl}/api/posts/delete-post/${id}`)
  }

  // add new announcement
  public announceToTrainees(data:any){
    return this.http.post(`${baseUrl}/api/posts/announcement`,data)
  }
}
