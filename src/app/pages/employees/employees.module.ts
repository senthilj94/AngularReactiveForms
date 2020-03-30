import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { EmployeesRoutes } from './employees.routing';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    ListEmployeesComponent,
    CreateEmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutes,
    SharedModule
  ]
})
export class EmployeesModule { }
