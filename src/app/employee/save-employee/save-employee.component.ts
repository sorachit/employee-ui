import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class SaveEmployeeComponent implements OnInit {

  departments: Department[] = [
    { "code": 1, "name": "Mavel" },
    { "code": 2, "name": "DC" }
  ];
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

  constructor(private employeeService: EmployeeService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { mode } = this.activeRoute.snapshot.data;
    this.mode = mode;
    const { id } = this.activeRoute.snapshot.params;
    if (id && Mode.EDIT === mode) {
      this.employeeService.getEmployeeById(id).subscribe(response => {
        this.employeeForm.patchValue(response);
      });
    }


  }


  saveEmployee() {
    const employee = this.employeeForm.value as Employee;
    if (this.employeeForm.valid) {
      if (Mode.EDIT === this.mode) {
        this.employeeService.editEmployee(employee).subscribe(response => {
          this.employeeForm.patchValue(response);
        });
      } else {
        this.employeeService.addEmployee(employee).subscribe(response => {
          this.employeeForm.patchValue(response);
        });
      }
    }
  }

  clearEmployee() {
    // this.employeeService.clearEmployee();
  }

}
