import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from '../service/timesheet.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isManager!: boolean;
  userId!: string;

  constructor(private router: Router, protected timesheetService: TimesheetService, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (this.employeeService.loginManager()) {
      this.isManager = true  
    }
    this.employeeService.loginDetails(sessionStorage.getItem('userId')).subscribe((data) => {
      this.employeeService.userName = data.first_name + " " + data.last_name
    })
    this.employeeService.showAllTimesheets
  }

  home() {
    this.employeeService.showAllTimesheets = false
    this.router.navigate(['home'])
  }

  showTable1() {
    this.router.navigate(['home/employee-list'])
  }

  showTable2() {
    this.employeeService.showAllTimesheets = true;
    this.router.navigate(['home/timesheet-list'])
  }

  showTable3() {
    this.router.navigate(['home/project-list'])
  }

  profile(){
    this.router.navigate(['home/my-profile'])
  }
}
