import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FirstComponent } from './first/first.component';
import { SaveEmployeeComponent } from './employee/save-employee/save-employee.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SearchEmployeeComponent } from './employee/search-employee/search-employee.component';
import { GenderPipe } from './pipe/gender.pipe';
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    EmployeeComponent,
    SaveEmployeeComponent,
    SearchEmployeeComponent,
    GenderPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  // https://www.infinetsoft.com/Post/When-reload-the-page-I-got-404-error-for-angular-10/3084#.YouOxahBy5c
  //{ provide: LocationStrategy, useClass: HashLocationStrategy }
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
