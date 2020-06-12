import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';
import { HttpClient } from '@angular/common/http';
import { Httpextension } from 'src/app/services/crudcalls/http/httpextension'
import { SessionService } from '../../session/session.service';
import { User } from 'src/app/classes/user';
@Injectable({
  providedIn: 'root'
})
export class StripeService {

  httpextensions: Httpextension;
  constructor(private http: HttpClient, private session: SessionService) { this.httpextensions = new Httpextension(this.session); }


  payment(token:any,user:User,Amount) {
    var jsonobject ={
      'token' : token,       
      'first_name' :user.FirstName,
      'last_name' :user.LastName,
      'email':user.Email,
      'Amount' : Amount
      
    }
    return this.http
      .post(Configuration.RestApiURL + "services/stripe/create.php", jsonobject,this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  
  }


}
