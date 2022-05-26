import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Department } from '../model/department';
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

  // ต้องการเก็บ Category[] เอาไว้เพื่อจะได้ไม่ต้อง query ใหม่
  private departments$ = new BehaviorSubject<Department[]>([]);

  callApiGetDepartment() {
    if (this.departments$.value.length === 0) {
      this.http.get<Department[]>('/api/department').subscribe(response => {
        this.departments$.next(response)
      });
    }
  }

  getDepartment() {
    return this.departments$;
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
