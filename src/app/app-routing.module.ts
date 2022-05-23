import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SaveEmployeeComponent } from './employee/save-employee/save-employee.component';
import { SearchEmployeeComponent } from './employee/search-employee/search-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        component: SearchEmployeeComponent,
      },
      {
        path: 'save',
        component: SaveEmployeeComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
