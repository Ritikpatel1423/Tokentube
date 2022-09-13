import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  submitted: boolean = false;
  isPasswordHide: boolean = false;
  isConfirmPasswordHide: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      last_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, Validators.required),
    })
  }

  get f() {
    return this.signupForm.controls;
  }


  singUp() {
    this.submitted = true;

    if (this.signupForm.controls['first_name'].value == "" || this.signupForm.controls['first_name'].value == null) {
      return;
    }
    else if (this.signupForm.controls['last_name'].value == "" || this.signupForm.controls['last_name'].value == null) {
      return;
    }
    else if (this.signupForm.controls['email'].value == "" || this.signupForm.controls['email'].value == null) {
      return;
    }
    else if (this.signupForm.controls['password'].value == "" || this.signupForm.controls['password'].value == null) {
      return;
    }
    else if (this.signupForm.controls['password_confirmation'].value == "" || this.signupForm.controls['password_confirmation'].value == null) {
      return;
    }
    else {
      this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
        .subscribe(res => {
          alert("signup Successfull");
          this.signupForm.reset();
          this.router.navigate(['login'])
        }, err => {
          alert("Something went wrong")
        })
    }

  }

  isNotMatched: boolean = false;
  pass = ''; conpass = '';

  NotMatched(value: any, item: any) {
    if (item == 'pass')
      this.pass = value.value;

    if (item == 'conpass')
      this.conpass = value.value;

    if (this.pass == this.conpass) {
      return this.isNotMatched = false;
    } else {
      return this.isNotMatched = true;
    }
  }

}
