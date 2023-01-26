import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../Models/User";
import {catchError, map, Observable, throwError} from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser={};
  url!: string;

  constructor(private http: HttpClient, public router: Router) {
   this.url = environment.url;
  }

  login(user: User,role:string) {

    user.grantType="password";
    user.username=user.email;
    user.withRefreshToken=true;

    role === "Client" ? user.role="CLIENT":user.role="AGENT";

    console.log(user)

    return this.http
      .post<any>(`${this.url}/token`, user)

      .subscribe(
        (res: any) => {
          if(res!=null){

            localStorage.setItem('access_token',res.accessToken );
            localStorage.setItem('refresh_token',res.refreshToken );
            localStorage.setItem('role',res.role);
            role === "Client" ? localStorage.setItem('id',res.client.id):localStorage.setItem('id',res.agent.id);

            res.role == "CLIENT" ?  this.router.navigate(['dashboard-client/']) : this.router.navigate(['dashboard-agent/'])
          }

        }),
      (err:any)=>{
      console.log(JSON.parse(err)
      )
      }
  }



  register(user: User) {
    console.log(user)
    return this.http
      .post<any>(`${this.url}/client/register`, user)
      .subscribe(
        (res: any) => {
          this.router.navigate(['login']);
        }),
      (err:any)=>{console.log(JSON.parse(err))
      }
  }


  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  getToken(){
    return localStorage.getItem('access_token');
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  handelError(error: HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg = error.message;
    }else{
      msg= `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}
