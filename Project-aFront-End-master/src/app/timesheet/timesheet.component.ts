import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { EmployeeService } from '../service/employee.service';
import { Project } from '../service/project';
import { ProjectService } from '../service/project.service';
import { Timesheet } from '../service/timesheet';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  @ViewChild('timesheetForm') timesheetForm !: NgForm;

  timesheetList: Timesheet[] = []
  id: string = '';
  locale: string = 'en-US'
  visible: boolean = false;
  projects: Array<Project> = [];
  userId!: string;
  maxDate!:string;
  minDate!:string;

  constructor(private router: Router, private route: ActivatedRoute, protected timesheetService: TimesheetService, protected employeeService: EmployeeService, protected projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params._id
      })
    if (this.id != undefined) {
      this.formData(this.id)
    }

    this.timesheetService.addedBy = sessionStorage.getItem("userId")

    this.employeeService.loginDetails(sessionStorage.getItem('userId')).subscribe((data) => {
      this.employeeService.userName = data.first_name + " " + data.last_name
    })

    this.projectService.getProject().subscribe((data) => {
      this.projectService.projects = data
      this.projects = this.projectService.projects
    })
    this.dateValidation()
  }

  formData(id1: any) {
    this.timesheetService.getTimesheetById(this.id).subscribe((data) => {
      data.date = formatDate(data.date, 'yyyy-MM-dd', this.locale);

      this.timesheetForm.setValue({
        _id: this.id,
        project_name: data.project_name,
        date: data.date,
        timesheet_name: data.timesheet_name,
        addedBy: data.addedBy,
        description: data.description,
        duration: data.duration
      })
    })
    return true;
  }

  logout() {
    if (window.confirm("Are you sure to Logout?"))
      this.router.navigate(['login'])
  }

  cancel() {
    if (this.id != undefined) {
    if (window.confirm("The Changes is not saved . Are you sure to leave?"))
      this.router.navigate(['home/timesheet-list'])
    }
    else{
      this.router.navigate(['home/timesheet-list'])
    }
  }

  Onsubmit(form: NgForm) {
    if (this.id != undefined) {
      form.value._id = this.id
      this.timesheetService.putTimesheet(form.value).subscribe((data) => {
        window.alert('TimeSheet Updated successfully!!!')
        this.refreshList();
      })
    }
    else {
      form.value.addedBy = this.timesheetService.addedBy
      this.timesheetService.postTimesheet(form.value).subscribe((data) => {
      })
      window.alert('TimeSheet Saved successfully!!!')
    }
    this.router.navigate(['home/timesheet-list'])
    this.refreshList();
  }

  refreshList() {
    this.timesheetService.getTimesheet().subscribe((data) => {
      this.timesheetService.timesheets = data;
    })
  }

  dateValidation(){
    let datee=new Date()
    let today:any|number=datee.getDate()
    let month:any|number=datee.getMonth() + 1
    let year:string|number=datee.getFullYear()

    if(today<10){
      today='0'+today
    }
    if(month<10){
      month='0'+month
    }
    this.maxDate=year+'-'+month+'-'+today
    this.minDate=year+'-'+month+'-'+(today-10)
  }

  profile(){
    this.router.navigate(['home/my-profile'])
  }

}
