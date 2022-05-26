import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit, OnDestroy {


  department?: Department;
  departments: Department[] = [];

  Gender = Gender;
  gender?: Gender;

  firstName?: string;
  lastName?: string;

  subscribeDepartment!: Subscription
  subscribeEmployees!: Subscription

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {

    this.employeeService.callApiGetDepartment();

    this.subscribeDepartment = this.employeeService.getDepartment().subscribe(response => {
      this.departments = response;
    });

    this.subscribeEmployees = this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees
    })

  }

  ngOnDestroy(): void {
    this.subscribeDepartment.unsubscribe();
    this.subscribeEmployees.unsubscribe();
  }

  queryEmployees() {
    const employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      department: this.department
    } as Employee;
    this.employeeService.queryEmployees(employee)
  }

  gotoSave() {
    this.router.navigate(['/employee/save']);
  }




}
