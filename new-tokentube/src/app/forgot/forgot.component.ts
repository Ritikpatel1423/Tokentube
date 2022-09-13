import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public forgotForm !: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)])
    })
  }

  get f() {
    return this.forgotForm.controls;
  }

  forgot() {
    this.submitted = true;
    if (this.forgotForm.controls['email'].value == "" || this.forgotForm.controls['email'].value == null) {
      return;
    }
    else {
      // this.http.post<any>("http://localhost:3000/signupUsers", this.forgotForm.value)
      //   .subscribe(res => {
      //     alert("signup Successfull");
      this.forgotForm.reset();
      this.router.navigate(['login'])
      // }, err => {
      //   alert("Something went wrong")
      // })
    }
  }

}