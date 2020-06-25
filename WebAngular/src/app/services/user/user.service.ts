import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';

import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/classes/cart';
import { Userdetails } from 'src/app/classes/userdetails';
import { SessionService } from '../session/session.service';
import { Httpextension } from '../crudcalls/http/httpextension';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  httpextensions: Httpextension;
  constructor(private http: HttpClient, private session: SessionService) { this.httpextensions = new Httpextension(this.session); }

  readalluser(){
    return this.http
    .post(Configuration.RestApiURL + "/services/user/readalluser.php",  this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }

  readuser() {

    var jsonorder_obj = {
      "userid": this.session.getUserId(),
      
    }

    return this.http
      .post(Configuration.RestApiURL + "/services/user/read.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

   readuserdetails() {

    var jsonorder_obj = {
      "userid": this.session.getUserId(),
      
    }
    return this.http
      .post(Configuration.RestApiURL + "/services/user/readuserdetails.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  updateuser(user:User){

    var jsonorder_obj = {

      "UserID": this.session.getUserId(),          
      "UserName": user.UserName,
      "FirstName": user.FirstName,
      "LastName": user.LastName,
      "Email": user.Email,
      "ImageURL" : user.ProflieImage_url,
      "password" :user.password
    }
    return this.http
    //services\user\updateuserdetail.php
      .post(Configuration.RestApiURL + "/services/user/update.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
      
  }

  updateuseradmin(user:User){

    var jsonorder_obj = {

      "UserID": user.UserID,          
      "UserName": user.UserName,
      "User_role": user.User_role,
      "FirstName": user.FirstName,
      "LastName": user.LastName,      
      "Email": user.Email,
      "isactive" : user.isactive,
      "password" :user.password
      

    }
    return this.http
      .post(Configuration.RestApiURL + "/services/user/updateuseradmin.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
      
  }

  updateuserdetails(userinfo:Userdetails){

    var jsonorder_obj = {
      "UserID": userinfo.UserID,          
      "contact_number" :userinfo.contact_number,
      "billing_street_address" :userinfo.billing_street_address,
      "billing_city_address":userinfo.billing_city_address,
      "billing_state_address" :userinfo.billing_state_address,
      "billing_country_address" :userinfo.billing_country_address,
      "billing_zip" :userinfo.billing_zip,
      "shipping_street_address" :userinfo.shipping_street_address,
      "shipping_city_address" :userinfo.shipping_city_address,
      "shipping_state_address" :userinfo.shipping_state_address,
      "shipping_country_address":userinfo.shipping_country_address,
      "shipping_zip":userinfo.shipping_zip            

      
    }
    return this.http
      .post(Configuration.RestApiURL + "services/user/updateuserdetail.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  deleteuser(userid){
    var jsonorder_obj = {
      "UserID": Number(userid)
      
    }
    return this.http
      .post(Configuration.RestApiURL + "services/user/delete.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );

  }

  createprofileimage(user_id,image_profile:any){
    var jsonobj = {
      "UserID":user_id,      
      "profile_image":image_profile
    }
    return this.http
    
    .post(Configuration.RestApiURL + "services/user/create.php",jsonobj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );

  }

  async createVisitorUser(user: User) {
    var jsonobj = {
      "UserName": user.UserName,
      "FirstName": user.FirstName,
      "LastName": user.LastName, 
      "isForceCreate": 1,
    }
    return await this.http    
      .post(Configuration.RestApiURL + "services/user/create.php", jsonobj, this.httpextensions.httpOptions)
      .toPromise()
      .then(
        function (response: any) {
          return {
            UserId: response.UserId,
          };
        },
        function (httpError) {
           throw httpError.status + " : " +
                 httpError.data;
        });
  }
}
