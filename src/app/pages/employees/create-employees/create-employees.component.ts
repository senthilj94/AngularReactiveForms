import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.scss']
})
export class CreateEmployeesComponent implements OnInit {

  employeeFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.employeeFormGroup = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }

  onSubmit() {
    console.log(this.employeeFormGroup.value);
    console.log(this.employeeFormGroup.controls.email.touched);
    console.log(this.employeeFormGroup.get('email').value);
  }
}
