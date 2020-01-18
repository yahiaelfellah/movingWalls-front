import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('yahia', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('yahia', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

}
 

  constructor(
    private authService: AuthenticationService,
    private route: Router,
    private alertService:AlertService,
    ) {
    if (this.authService.isLoggedIn)
      this.route.navigate(['/home']);
  }

  get f() { return this.loginForm.controls; }

  submit() {
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.f.username.value,this.f.password.value)
      .subscribe(
        response => {
          this.route.navigate(['home']);
      },
        (error) => {
          console.log(error);
          this.alertService.error(error.message);
        }
      )
  }
}
