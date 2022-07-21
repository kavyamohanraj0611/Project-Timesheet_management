import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, protected employeeService: EmployeeService) { }

  login(form: NgForm) {
    this.employeeService.login(form.value).subscribe((data:any) => {

      this.employeeService.loginRole = data.user.role
      if (this.employeeService.loginRole == "Manager") {
        sessionStorage.setItem('role', data.user.role)
      }
      sessionStorage.setItem('token', data.token)
      
      sessionStorage.setItem('userId', data.user.employeeId)
      this.router.navigate(['/home'])
    })
    form.reset()
  }

  signUp() {
    this.router.navigate(['/sign-up'])
  }

}
