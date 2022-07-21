import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Timesheet } from '../service/timesheet';
import { TimesheetService } from '../service/timesheet.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss']
})
export class TimesheetListComponent implements OnInit {

  totalTimesheets!: number;
  page: number = 1;
  visible: boolean = false;
  totalMyTimesheets!: number;
  isManager!: boolean;
  selectedTimeSheet!: String;

  constructor(private router: Router, protected timesheetService: TimesheetService, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (this.employeeService.loginManager()) {
      this.isManager = true
    }
    else
    this.employeeService.showAllTimesheets=false
    this.router.navigate(['home/timesheet-list'])
    this.timesheetList();
  }

  createTimeSheet() {
    this.router.navigate(['timesheet/create-timesheet'])
  }

  editTimeSheet(timesheet: Timesheet) {
    this.timesheetService.getTimesheetById(timesheet._id).subscribe((data) => {
      this.timesheetService.selectedTimeSheet = data;
      this.selectedTimeSheet = this.timesheetService.timesheetToEdit()
      this.router.navigate(['timesheet/edit-timesheet/' + this.selectedTimeSheet])
      this.timesheetList()
    })
  }

  deleteTimeSheet(timesheet: Timesheet) {
    if (window.confirm("The Timesheet will be deleted and cannot be reterived . Are you sure to delete this?")) {
      this.timesheetService.deleteTimesheet1(timesheet._id).subscribe(() => {
        this.timesheetList();
      })
    }
    else {
      this.timesheetList();
    }
  }

  timesheetList() {
    if (this.employeeService.loginManager()) {
      this.isManager = true
      this.timesheetService.getTimesheet().subscribe((data) => {
        this.timesheetService.timesheets = data;
        if (data == 0) { this.visible = true }
        this.totalTimesheets = this.timesheetService.timesheets.length
      })
      this.timesheetService.getEmployeeTimesheet(sessionStorage.getItem('userId')).subscribe((data) => {
        this.timesheetService.myTimesheets = data;
        if (data == 0) { this.visible = true }
        this.totalMyTimesheets = this.timesheetService.myTimesheets.length
      });
    }
    else {
      this.timesheetService.getEmployeeTimesheet(sessionStorage.getItem('userId')).subscribe((data) => {
        this.timesheetService.myTimesheets = data;
        if (data == 0) { this.visible = true }
        this.totalTimesheets = this.timesheetService.myTimesheets.length
      })
    }
  }

}
