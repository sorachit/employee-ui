import { Component, OnInit } from '@angular/core';
import { Department } from '../model/department';


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

  gender?: string;

  firstName?: string;
  lastName?: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
