import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component(
    {templateUrl: 'login.component.html',
    styleUrls: ["./login.component.scss"]})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _loginService: LoginService
    ) {
        // redirect to home if already logged in
        let currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser != null) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        if(this.loginForm.controls["username"].value !== "" &&
        this.loginForm.controls["password"].value !== "" ){
            this._loginService.login(this.loginForm.controls["username"].value,
            this.loginForm.controls["password"].value).subscribe((res)=>{
                if(res.token != null){
                    localStorage.setItem("user", JSON.stringify({"token":res.token}));
                    this.router.navigate([this.returnUrl]);     
                }
            });       
        }     
    }
}
