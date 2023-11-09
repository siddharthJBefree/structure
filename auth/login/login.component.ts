import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {environment} from 'projects/admin/src/environments/environment';
import {PublicService} from '../../core/services/public.service';
import {AuthService} from './../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  year = moment().year();
  platform = environment.PLATFORM;

  constructor(
    public ps: PublicService,
    public _fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = <FormGroup>this._fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false),
      termAndCondition: new FormControl(false)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue());
    }
  }
}
