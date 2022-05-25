import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SaveEmployeeComponent } from './employee/save-employee/save-employee.component';
import { SearchEmployeeComponent } from './employee/search-employee/search-employee.component';
import { Mode } from './type/mode';

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
        data: { mode: Mode.ADD }
      },
      {
        path: 'edit/:id',
        component: SaveEmployeeComponent,
        data: { mode: Mode.EDIT }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
