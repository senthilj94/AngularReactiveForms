import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.scss']
})
export class CreateEmployeesComponent implements OnInit {

  employeeFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.employeeFormGroup = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({    // Nested Form Group
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });

    this.employeeFormGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      skills: this.fb.group({    // Nested Form Group
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    });

    this.employeeFormGroup.get('fullName').valueChanges.subscribe(value => {
      console.log(value);
    });

    this.employeeFormGroup.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  onLoadDataClick() {
    this.employeeFormGroup.patchValue({ // also set value
      fullName: 'senthil',
      email: 'senthil@gmail.com',
      skills: {
        skillName: 'fullstack',
        experienceInYears: '4',
        proficiency: 'intermediate'
      }
    });

  }

  onSubmit() {
    console.log(this.employeeFormGroup);
    console.log(this.employeeFormGroup.controls.email.touched);
    console.log(this.employeeFormGroup.get('email').value);
  }
}
