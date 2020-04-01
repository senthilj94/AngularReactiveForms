import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (
        email === '' ||
        domain.toLocaleLowerCase() === domainName.toLocaleLowerCase()
      ) {
        return null;
      } else {
        return { emailDomain: true };
      }
    };
  }
}
