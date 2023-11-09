import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function EqualValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
  return (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const targetControl = group.get(targetKey);
    const toMachControl = group.get(toMatchKey);
    if (targetControl?.value !== toMachControl?.value) {
      toMachControl?.setErrors({notEqual: true});
    } else {
      toMachControl?.setErrors(null);
    }
    return null;
  };
}
