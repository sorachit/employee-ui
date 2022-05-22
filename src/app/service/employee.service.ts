import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  employees: Employee[] = [];

  constructor() { }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  getEmployees() {
    return this.employees;
  }

  clearEmployee() {
    this.employees = [];
  }

}
