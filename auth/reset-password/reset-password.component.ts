import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {PublicService} from '../../core/services/public.service';
import {EqualValueValidator} from '../../core/validations/equal-to.validate';
import {SharedModule} from '../../shared/shared.module';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  year = moment().year();

  constructor(
    public ps: PublicService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createResetForm();
  }

  createResetForm() {
    this.resetForm = <FormGroup>this._fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    this.resetForm.setValidators(EqualValueValidator('password', 'confirmPassword'));
  }

  onSubmit() {
    if (this.resetForm.valid) {
      // Code ................
    }
  }
}
