import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeesComponent
  },
  {
    path: 'create',
    component: CreateEmployeesComponent
  },
  {
    path: 'edit/:id',
    component: CreateEmployeesComponent
  }
];

export const EmployeesRoutes = RouterModule.forChild(routes);
