import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('../app/pages/employees/employees.module')
    .then(m => m.EmployeesModule)
  },
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
