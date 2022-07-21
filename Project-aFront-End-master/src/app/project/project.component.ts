import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private router: Router, protected projectService: ProjectService, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.loginDetails(sessionStorage.getItem('userId')).subscribe((data) => {
      this.employeeService.userName=data.first_name+" "+data.last_name
      console.log(this.employeeService.userName)
    })
  }


  cancel() {

    if (window.confirm("The Changes is not saved . Are you sure to leave?"))
      this.router.navigate(['home/project-list'])
  }

  addProject(form: NgForm) {
    this.projectService.technologies.push(form.value.frontEndTech)
    this.projectService.technologies.push(form.value.backEndTech)
    this.projectService.technologies.push(form.value.database)
    form.value.technologies = this.projectService.technologies
    
    this.projectService.addProject(form.value).subscribe((data) => {
      window.alert('Project Saved successfully!!!')
      this.router.navigate(['home/project-list'])
    })

  }
  profile(){
    this.router.navigate(['home/my-profile'])
  }

}


