import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { Gender } from '../type/gender';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  department?: Department;
  departments: Department[] = [
    { "code": 1, "name": "Mavel" },
    { "code": 2, "name": "DC" }
  ];

  Gender = Gender;
  gender?: Gender;

  firstName?: string;
  lastName?: string;


  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
  }

  getEmployee() {
    const employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      department: this.department
    } as Employee;
    this.employeeService.getEmployees(employee).subscribe(response => {
      this.employees = response;
    });
  }

  addEmployee() {
    const employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      department: this.department
    } as Employee;

    this.employeeService.addEmployee(employee);
  }

  clearEmployee() {
    // this.employeeService.clearEmployee();
  }

}
