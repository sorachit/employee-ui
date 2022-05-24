import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Gender } from 'src/app/type/gender';

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
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    department: new FormControl(),
  })

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }


  saveEmployee() {
    const employee = this.employeeForm.value as Employee;
    this.employeeService.addEmployee(employee).subscribe(response => {

    });
  }

  clearEmployee() {
    // this.employeeService.clearEmployee();
  }

}
