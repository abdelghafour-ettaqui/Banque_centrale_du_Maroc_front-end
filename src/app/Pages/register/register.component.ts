import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   standard:string="standard";
  professionnel:string="professionnel"
  RegisterForm: FormGroup;


  constructor(
    private router:Router,
    private fb:FormBuilder,
    public authService: AuthService
  ) {

    this.RegisterForm= this.fb.group({
      nom:[''],
      prenom:[''],
      tel:[''],
      adresse:[''],
      email:[''],
      cin:[''],
      password:[''],
      compteName:['standard']
    });
  }

  RegisterUser(){
    this.authService.register(this.RegisterForm.value);
  }
  Login(){
    this.router.navigate(['login']);
  }


}
