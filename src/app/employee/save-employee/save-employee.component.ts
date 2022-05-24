import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';
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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }


  saveEmployee() {
    const employee = this.employeeForm.value as Employee;
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(employee).subscribe(response => {
      });
    }
  }

  clearEmployee() {
    // this.employeeService.clearEmployee();
  }

}
