import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('profileView') profile !: NgForm;
  enableField: boolean=false;
  _id:string=''

  constructor(private router: Router,protected employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.formData()
  }
  
  formData() {
    this.employeeService.loginDetails(sessionStorage.getItem('userId')).subscribe((data) => {
      this._id=data._id
      this.profile.setValue({
        _id:data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        employeeId: data.employeeId,
        emailId: data.emailId,
        department: data.department,
        role: data.role
      })
    })
    return true;
  }

  editProfile(){
    this.router.navigate(['employee/edit-employee/'+ this._id])
  }

  home(){
    this.router.navigate(['home'])
  }
}
