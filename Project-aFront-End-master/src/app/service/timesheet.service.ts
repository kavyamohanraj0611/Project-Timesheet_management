import { Injectable } from '@angular/core';
import { Timesheet } from './timesheet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient, private router: Router) { }
  _id!: Timesheet
  project_name!: Timesheet;
  date!: Timesheet;
  timesheet_name!: Timesheet;
  addedBy!: any;
  description!: Timesheet;
  duration!: Timesheet;


  selectedTimeSheet!: Timesheet;
  timesheets!: Timesheet[];
  myTimesheets!:Timesheet[];

  timesheetToEdit() {
    return this.selectedTimeSheet._id;
  }

  getTimesheet() {
    return this.http.get<any>(environment.timesheetURL)
  }

  getTimesheetById(_id: String) {
    return this.http.get<any>(environment.timesheetURL + `${_id}`)
  }

  getEmployeeTimesheet(employeeId: any) {
    return this.http.get<any>(environment.timesheetURL + 'timesheet-list/' + `${employeeId}`)
  }

  postTimesheet(timesheet: Timesheet) {
    return this.http.post(environment.timesheetURL, timesheet);
  }

  putTimesheet(ts: any) {
    return this.http.put(environment.timesheetURL + 'update/' + `${ts._id}`, ts);
  }

  deleteTimesheet1(_id: String) {
    return this.http.delete(environment.timesheetURL + 'delete/' + `${_id}`);
  }

}
