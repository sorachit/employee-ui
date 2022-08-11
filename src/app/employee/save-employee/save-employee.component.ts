import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
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
    version: new FormControl()
  })
  mode!: Mode;
  Mode = Mode;

  subscribeDepartment: any
  constructor(private employeeService: EmployeeService, private activeRoute: ActivatedRoute, private messageService: MessageService) { }


  ngOnInit(): void {

    this.employeeService.callApiGetDepartment();

    this.subscribeDepartment = this.employeeService.getDepartment().subscribe(response => {
      this.departments = response;
    });

    const { mode } = this.activeRoute.snapshot.data;
    this.mode = mode;
    const { id } = this.activeRoute.snapshot.params;
    if (id && Mode.EDIT === mode) {
      this.employeeService.getEmployeeById(id).subscribe(response => {
        this.employeeForm.patchValue(response);
      });
    }


  }

  ngOnDestroy(): void {
    this.subscribeDepartment.unsubscribe();
  }

  saveEmployee() {
    const employee = this.employeeForm.value as Employee;
    if (this.employeeForm.valid) {
      if (Mode.EDIT === this.mode) {
        this.employeeService.editEmployee(employee).subscribe(response => {
          this.employeeForm.patchValue(response);
          this.messageService.add({ severity: 'success', summary: 'Edit Message', detail: 'Edit employee success.' });
        });
      } else {
        this.employeeService.addEmployee(employee).subscribe(response => {
          this.employeeForm.patchValue(response);
          this.messageService.add({ severity: 'success', summary: 'Add Message', detail: 'Add employee success.' });
        });
      }
    }
  }

  deleteEmployee() {
    const id = this.employeeForm.get("id")?.value;
    this.employeeService.deleteEmployee(id).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Remove Message', detail: 'Remove employee success' });
    });
  }


}
