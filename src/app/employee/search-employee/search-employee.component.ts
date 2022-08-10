import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  Gender = Gender;

  subscribeDepartment!: Subscription
  subscribeEmployees!: Subscription

  employees: Employee[] = [];
  selectedEmployees: Employee[] = [];

  isLoading: boolean = false; // คุมการทำงานของปุ่ม ว่าให้ขึ้น loading หรือไม่

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    gender: new FormControl(Gender.MALE),
    department: new FormControl(null),
  })

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private router: Router) {

  }




  ngOnInit(): void {

    this.departmentService.callApiGetDepartment();

    this.subscribeDepartment = this.departmentService.getDepartment().subscribe(response => {
      this.departments = response;
    });

    this.subscribeEmployees = this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees
    })

    //https://www.credera.com/insights/using-rxjs-switchmap-angular-7-reactive-forms-cancel-pending-requests
    this.employeeForm.valueChanges.pipe(
      debounceTime(200),
      switchMap(() => this.employeeService.queryEmployees(this.employeeForm.value))
    ).subscribe();
  }



  ngOnDestroy(): void {
    this.subscribeDepartment.unsubscribe();
    this.subscribeEmployees.unsubscribe();
  }

  gotoSave() {
    this.router.navigate(['/employee/save']);
  }

  deleteEmployees() {
    this.isLoading = true;
    const ids: number[] = this.selectedEmployees.map(employee => {
      return employee.id;
    });
    this.employeeService.deleteEmployees(ids).subscribe(() => {
      this.isLoading = false;
      this.selectedEmployees = []; // ล้างค่า array ที่เลือกมา
    });
  }



}
