import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray
} from '@angular/forms';
import { CustomValidator } from '../../../shared/shared/custom-validator';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/IEmployee';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.scss']
})
export class CreateEmployeesComponent implements OnInit {
  employeeFormGroup: FormGroup;

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYears: '',
    proficiency: ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.'
    },
    email: {
      required: 'Email is required.'
    },
    skillName: {
      required: 'Skill Name is required.'
    },
    experienceInYears: {
      required: 'Experience is required.'
    },
    proficiency: {
      required: 'Proficiency is required.'
    }
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService) {}

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

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      }
    });

    this.employeeFormGroup = this.fb.group(
      {
        fullName: ['', Validators.minLength(2)],
        email: ['', CustomValidator.emailDomain('gmail.com')],
        skills: this.fb.array([
          this.addSkillsFormGroup()
        ])
      },
      Validators.required
    );

    this.employeeFormGroup.get('fullName').valueChanges.subscribe(value => {
      console.log(value);
    });

    this.employeeFormGroup.valueChanges.subscribe(value => {
      this.logValidationErrors(this.employeeFormGroup);
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => this.editEmployee(employee),
        (err: any) => console.log(err)
      );
  }

  addSkillsFormGroup(): (FormGroup) {
    return this.fb.group({
      // Nested Form Group
      skillName: [''],
      experienceInYears: [''],
      proficiency: ['beginner']
    });
  }

  logKeyValuePairs(group: FormGroup) {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
      }
    });
  }

  logValidationErrors(group: FormGroup = this.employeeFormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // We need this additional check to get to the FormGroup
      // in the FormArray and then recursively call this
      // logValidationErrors() method to fix the broken validation
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      }
    });
  }

  onLoadDataClick() {
    // this.employeeFormGroup.patchValue({ // also set value
    //   fullName: 'senthil',
    //   email: 'senthil@gmail.com',
    //   skills: {
    //     skillName: 'fullstack',
    //     experienceInYears: '4',
    //     proficiency: 'intermediate'
    //   }
    // });
    this.logKeyValuePairs(this.employeeFormGroup);
  }

  onSubmit() {
    console.log(this.employeeFormGroup);
    console.log(this.employeeFormGroup.controls.email.touched);
    console.log(this.employeeFormGroup.get('email').value);
  }

  addSkillButtonClick(): void {
    (this.employeeFormGroup.get('skills') as FormArray).push(this.addSkillsFormGroup());
    console.log(this.employeeFormGroup);
  }

  getControls() {
    return (this.employeeFormGroup.get('skills') as FormArray).controls;
  }

  editEmployee(employee: IEmployee) {
    this.employeeFormGroup.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
  }
}
