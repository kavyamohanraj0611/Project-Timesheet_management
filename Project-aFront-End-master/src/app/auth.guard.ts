import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeeService } from './service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  canActivate(): boolean {
    if (this.employeeService.loggedIn()) {
      return true
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
