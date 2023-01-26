import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Routes/app-routing.module';
import { AppComponent } from './app.component';
import { LoginClientComponent } from './Pages/login-client/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./Shared/auth.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginAgentComponent } from "./Pages/login-agent/login-agent.component";
import { LoginFormComponent } from './Components/login-form/login-form.component';
import {EmailValidatorDirective} from "./FormValidation/EmailValidatorDirective";


@NgModule({
  declarations: [
    AppComponent,
    LoginClientComponent,
    RegisterComponent,
    LoginAgentComponent,
    LoginFormComponent,
    EmailValidatorDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
