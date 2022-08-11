import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';
import { Mode } from 'src/app/type/mode';
import { customName } from 'src/app/validate/custom-name';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.scss']
})
export class SaveEmployeeComponent implements OnInit, OnDestroy {

  departments: Department[] = [];
  Gender = Gender;

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2), customName]),
    lastName: new FormControl(null, Validators.required),
    gender: new FormControl(Gender.MALE),
    department: new FormControl(null, Validators.required),
  })
  mode!: Mode;
  Mode = Mode;

  subscribeDepartment!: Subscription
  subscribeEmployee!: Subscription
  isLoading!: boolean;
  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private activeRoute: ActivatedRoute, private messageService: MessageService) { }


  ngOnInit(): void {

    this.departmentService.callApiGetDepartment();

    this.subscribeDepartment = this.departmentService.getDepartment().subscribe(response => {
      this.departments = response;
    });

    this.subscribeEmployee = this.employeeService.getEmployee().subscribe(response => {
      console.log('subscribe getEmployee patchValue', response);
      this.employeeForm.patchValue(response);
    });

    const { mode } = this.activeRoute.snapshot.data;
    this.mode = mode;
    const { id } = this.activeRoute.snapshot.params;
    if (id && Mode.EDIT === mode) {
      console.log('queryEmployeeById', id);
      this.employeeService.queryEmployeeById(id);
    }
  }

  ngOnDestroy(): void {
    this.subscribeDepartment.unsubscribe();
    this.subscribeEmployee.unsubscribe();
  }

  saveEmployee() {
    this.isLoading = true;
    const employee = this.employeeForm.value as Employee;
    if (this.employeeForm.valid) {
      if (Mode.EDIT === this.mode) {
        this.employeeService.editEmployee(employee).subscribe({
          next: (v) => {
            console.log('next editEmployee');
          },
          complete: () => {
            console.log('complete editEmployee');
            this.isLoading = false;
          }, error: (e) => {
            console.log('error editEmployee');
            this.isLoading = false;
          }
        });
      } else {
        this.employeeService.addEmployee(employee).subscribe({
          next: (v) => {
            console.log('next addEmployee');
          },
          complete: () => {
            console.log('complete addEmployee');
            this.mode = Mode.EDIT
            this.isLoading = false;
          }, error: (e) => {
            console.log('error addEmployee');
            this.isLoading = false;
          }
        });
      }
    }
  }

  deleteEmployee() {
    const id = this.employeeForm.get("id")?.value;
    this.employeeService.deleteEmployee(id).subscribe({
      next: (v) => {
        console.log('next deleteEmployee');
      },
      complete: () => {
        console.log('complete deleteEmployee');
        this.mode = Mode.ADD
        this.isLoading = false;
      }, error: (e) => {
        console.log('error deleteEmployee');
        this.isLoading = false;
      }
    });
  }


}
