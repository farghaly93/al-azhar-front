import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/shared/canDeactivate';
import { AuthServices } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authServices: AuthServices, private router: Router) { }

  login = true;
  form!: FormGroup;
  error!: string;
  loading = false;

  ngOnInit(): void {
    if(localStorage.getItem("token")) {
      this.router.navigate(["admin-panel"]);
    }
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.authServices.ErrorOccured.subscribe(err => {
      this.error = err;
      this.loading = false;
    });
  }

  submitLogin() {
    this.loading = true;
    const method = this.login? "login": 'signup';
    this.authServices.auth(this.form.value, method);
  }

  switchAuth() {
    this.login = !this.login;
  }

  isValid(field: string, validator: string) {
    const isValid = this.form.controls[field].touched && this.form.controls[field].errors?.[validator];
    return isValid;
  }

}
