import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department';
import { Gender } from '../type/gender';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  department?: string;
  departments: Department[] = [
    { "code": 1, "name": "Mavel" },
    { "code": 2, "name": "DC" }
  ];

  Gender = Gender;
  gender?: string;

  firstName?: string;
  lastName?: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
