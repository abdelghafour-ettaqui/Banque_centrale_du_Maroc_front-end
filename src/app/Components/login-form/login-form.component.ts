import { Component, Input } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
import {emailValidator} from "../../FormValidation/EmailValidatorDirective";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Input() role!:string;


  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) {
    this.loginForm= this.fb.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }


  loginUser(){
    this.authService.login(this.loginForm.value,this.role);
  }
  Register(){
    this.router.navigate(['register']);
  }

}
