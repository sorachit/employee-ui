import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  subscribeDepartment: any

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {

    this.employeeService.callApiGetDepartment();

    this.subscribeDepartment = this.employeeService.getDepartment().subscribe(response => {
      this.departments = response;
    });

  }

  ngOnDestroy(): void {
    this.subscribeDepartment.unsubscribe();
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

  gotoSave() {
    this.router.navigate(['/employee/save']);
  }




}
