import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../service/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm !: NgForm;
  id!: String;
  formTypeEdit: boolean = false;
  visible: boolean = false;
  employees!: Employee;
  isManager: boolean = false;
  enableField: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, protected employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params._id
      })
    if (this.id != undefined) {
      this.formTypeEdit = true
      this.formData(this.id)
    }
    if (this.employeeService.loginManager()) {
      this.isManager = true
    }
    this.enableField = this.formTypeEdit && !this.isManager
  }

  checkPass(event: Event) {
    if (this.employeeService.password == this.employeeService.confirmPass) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
  }

  cancel() {
    if (this.id != undefined) {
      if (window.confirm("The Changes is not saved . Are you sure to leave?"))
        if (this.isManager)
          this.router.navigate(['home/employee-list']);
        else
          this.router.navigate(['home/my-profile'])
    }
    else {
      this.router.navigate(['login'])
    }
  }

  formData(id1: any) {

    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.signUpForm.setValue({
        _id: this.id,
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

  register(form: NgForm) {
    if (this.id != undefined) {
      form.value._id = this.id
      this.employeeService.putEmployee(form.value).subscribe((data) => {
        window.alert('Updated successfully!!!');
        if (this.isManager)
          this.router.navigate(['home/employee-list']);
        else
          this.router.navigate(['home/my-profile'])
        this.refreshList();
      })
    }
    else {
      this.employeeService.postEmployee(form.value).subscribe((data: any) => {
        sessionStorage.setItem('token', data.token)
        window.alert("Successfully registered! Please login to continue")
        this.router.navigate(['login'])
      })
    }
  }

  refreshList() {
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
      this.employeeService.employees = data;
    })
  }

}
