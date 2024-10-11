import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helpers';


@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(private http:HttpClient) { }

  // create new sprint
  public createSprint(sprint:any){
    return this.http.post(`${baseUrl}/api/sprints/create`,sprint)
  }

  // get all sprints under specific batch
  public getAllSprintsByBatch(id:any){
    return this.http.get(`${baseUrl}/api/sprints/view-sprints/${id}`)
  }

  // get sprint by sprint id
  public getSprintById(id:any){
    return this.http.get(`${baseUrl}/api/sprints/view-sprint/${id}`)
  }

  // delete sprint by id
  public deleteSprintById(id:any){
    return this.http.delete(`${baseUrl}/api/sprints/delete-sprint/${id}`)
  }

  // update sprint by id
  public updateSprintById(id:any,data:any){
    return this.http.put(`${baseUrl}/api/sprints/update-sprint/${id}`,data)
  }
}
