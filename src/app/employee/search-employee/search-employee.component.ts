import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {


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
