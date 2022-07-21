import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Project } from '../service/project';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  isManager!: boolean;
  totalProjects!: number;
  page: number = 1;
  visible: boolean = false;

  constructor(private router:Router,protected projectService:ProjectService,protected employeeService:EmployeeService) { }


  ngOnInit(): void {
    this.projectList();
    if (this.employeeService.loginManager()) {
      this.isManager = true
    }
  }

  addProject(){
    this.router.navigate(['home/project/add-project'])
  }
  deleteProject(data: Project) {
    if (window.confirm("The Project will be deleted and cannot be reterived . Are you sure to delete this?")) {
      this.projectService.deleteProject(data._id).subscribe((data1) => {
        this.projectList();
      })
    }
    else {
      this.projectList();
    }
  }

  projectList() {
    this.projectService.getProject().subscribe((data) => {
      this.projectService.projects = data;
      this.totalProjects = this.projectService.projects.length
      if (data == 0) { this.visible = true }
    })
  }

}
