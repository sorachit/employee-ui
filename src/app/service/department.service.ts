import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  // ต้องการเก็บ department[] เอาไว้เพื่อจะได้ไม่ต้อง query ใหม่
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

}
