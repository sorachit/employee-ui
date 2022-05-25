import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  // employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>('/api/employee', employee);
  }

  editEmployee(employee: Employee) {
    return this.http.put<Employee>(`/api/employee/${employee.id}`, employee);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`/api/employee/${id}`);
  }


  getEmployees(employee: Employee) {
    let httpParams = new HttpParams();
    if (employee.firstName) {
      httpParams = httpParams.append('firstName', employee.firstName);
    }
    if (employee.lastName) {
      httpParams = httpParams.append('lastName', employee.lastName);
    }
    if (employee.gender) {
      httpParams = httpParams.append('gender', employee.gender);
    }
    if (employee.department) {
      httpParams = httpParams.append('department', employee.department.code);
    }
    return this.http.get<Employee[]>('/api/employee/search', { params: httpParams });
  }

  deleteEmployee(id: number) {
    return this.http.delete(`/api/employee/${id}`);
  }

}
