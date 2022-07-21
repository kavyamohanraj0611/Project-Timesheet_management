import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  _id!: Project;
  title!: Project;
  description!: Project;
  technologies:Array<String>=[];
  frontEndTech!: String;
  backEndTech!: String;
  database!: String;
  createdOn!: Project;
  deadline!: Project;

  projects!: Project[]


  getProject() {
    return this.http.get<any>(environment.projectURL)
  }

  deleteProject(_id: String) {
    return this.http.delete(environment.projectURL + 'delete/' + `${_id}`, { responseType: 'text' })
  }

  addProject(project:Project){
    return this.http.post(environment.projectURL+ 'add-project/',project)
  }

}
