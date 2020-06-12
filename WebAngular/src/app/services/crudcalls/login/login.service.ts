import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Configuration} from '../../../classes/config/Configuration' 
import { HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { from } from 'rxjs';
import { User } from 'src/app/classes/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    "Accept": "application/json",
    'Authorization': 'my-auth-token'
  })
  };

// Login doesnt validate
  login(userinfo){

    var stringified = JSON.stringify(userinfo);

    return this.http
    .post(Configuration.RestApiURL + "services/user/login.php", stringified, this.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }

  register(userinfo:User){
    var obj ={
      'username' : userinfo.UserName.trim(),
      'firstname' : userinfo.FirstName.trim(),      
      'email' : userinfo.Email.trim(),
      'lastname' : userinfo.LastName.trim(),
      'password' : userinfo.password.trim()
     }

    var json = JSON.stringify(obj);

    return this.http
    .post(Configuration.RestApiURL + "services/user/register.php", json, this.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }

 
 
}
