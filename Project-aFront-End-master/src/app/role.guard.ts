import { Injectable } from '@angular/core';
import { CanActivate ,Router } from '@angular/router';
import { EmployeeService } from './service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(protected employeeService:EmployeeService, private router: Router){}

  canActivate(): boolean {
    if (this.employeeService.loginManager()) {
      return true
    }
    else {
      this.router.navigate(['/home'])
      window.alert("Access denied")
      return false
    }
  }
}
