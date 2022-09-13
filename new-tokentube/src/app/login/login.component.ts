import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required])
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.controls['email'].value == "" || this.loginForm.controls['email'].value == null) {
      return;
    }
    else if (this.loginForm.controls['password'].value == "" || this.loginForm.controls['password'].value == null) {
      return;
    }
    else {
      // this.http.post<any>("http://localhost:3000/signupUsers", this.loginForm.value)
      //   .subscribe(res => {
      //     alert("signup Successfull");
      this.loginForm.reset();
      this.router.navigate(['dashboard'])
      // }, err => {
      //   alert("Something went wrong")
      // })
    }
  }

}
