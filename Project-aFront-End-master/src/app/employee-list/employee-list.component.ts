import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../service/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  visible: boolean = false;
  selectedEmployee!: String;
  totalEmployees!: number;
  page: number = 1;
  constructor(private router:Router,protected employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeList();
  }

  editEmployee(emp: Employee) {
    this.employeeService.getEmployeeById(emp._id).subscribe((data) => {
      this.employeeService.selectedEmployee = data;
      this.selectedEmployee = this.employeeService.employeeToEdit()
      this.router.navigate(['employee/edit-employee/' + this.selectedEmployee])
    })
  }

  deleteEmployee(emp: Employee) {
    if (window.confirm("This Employee details will be deleted and cannot be reterived . Are you sure to delete this?")) {
      this.employeeService.deleteEmployee1(emp._id).subscribe((data) => {
        this.employeeList();
      })
    }
    else {
      this.employeeList();
    }
  }

  employeeList() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeService.employees = data;
      this.totalEmployees = this.employeeService.employees.length
      if (data == 0) { this.visible = true }
    })
  }

}
