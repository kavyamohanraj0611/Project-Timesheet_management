import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Login } from './login';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private router: Router) {
    console.log(environment.employeeURL)
   }
  _id!: Employee;
  first_name!: Employee;
  last_name!: Employee;
  employeeId!: Employee;
  emailId!: Employee;
  department!: Employee;
  role!: Employee;
  password!: Employee;
  confirmPass!: Employee;

  employees!: Employee[]
  selectedEmployee!: Employee;
  loginRole!: String;
  loginData!: Login;
  showAllTimesheets: boolean = false;

  userName!: String;

  employeeToEdit() {
    return this.selectedEmployee._id;
  }

  getEmployee() {
    return this.http.get<any>(environment.employeeURL)
  }

  getEmployeeById(_id: String) {
    return this.http.get<any>(environment.employeeURL + `${_id}`)
  }

  postEmployee(employee: Employee) {
    return this.http.post(environment.employeeURL + 'sign-up', employee)
  }

  putEmployee(emp: Employee) {
    return this.http.put(environment.employeeURL + 'update/' + `${emp._id}`, emp, { responseType: 'text' });
  }

  deleteEmployee1(_id: String) {
    return this.http.delete(environment.employeeURL + 'delete/' + `${_id}`, { responseType: 'text' });
  }

  loginManager(): boolean {
    return !!sessionStorage.getItem('role')
  }

  loginDetails(employeeId: any) {
    return this.http.get<any>(environment.employeeURL + 'login/login-data/' + employeeId)
  }

  login(data: Login) {
    this.loginData = data;
    return this.http.post(environment.employeeURL + 'login/', data);
  }

  loggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUserId(): String {
    return <string>sessionStorage.getItem('userId')
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  logout() {
    if (window.confirm("Are you sure to Logout?")) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('userId')
      this.router.navigate(['login'])
    }
  }

}
