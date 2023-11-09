import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {PublicService} from '../../core/services/public.service';
import {EqualValueValidator} from '../../core/validations/equal-to.validate';
import {SharedModule} from '../../shared/shared.module';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  year = moment().year();

  constructor(
    public ps: PublicService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForgotForm();
  }

  createForgotForm() {
    this.forgotForm = <FormGroup>this._fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    this.forgotForm.setValidators(EqualValueValidator('password', 'confirmPassword'));
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      // Code ................
    }
  }
}
