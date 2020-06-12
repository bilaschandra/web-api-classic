import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';
import { HttpClient } from '@angular/common/http';
import { Httpextension } from 'src/app/services/crudcalls/http/httpextension'
import { SessionService } from '../../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  


  httpextensions: Httpextension;
  constructor(private http: HttpClient, private session: SessionService) { this.httpextensions = new Httpextension(this.session); }


  readcategory() {
    return this.http
      .post(Configuration.RestApiURL + "services/category/read.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  
  readcategoryadmin() {
    return this.http
      .post(Configuration.RestApiURL + "services/category/readadmin.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  create(category:string) {
    var jsonobject ={
      'category' : category.trim()
    }
    return this.http
      .post(Configuration.RestApiURL + "services/category/create.php", jsonobject,this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
   
  }

  edit(category:string,id,status) {
    var jsonobject ={
      'category' : category.trim(),
       'id':id,
       'status':status 
    }
    return this.http
      .post(Configuration.RestApiURL + "services/category/update.php", jsonobject,this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
   
  }

  delete(id:string) {
    var jsonobject ={
    
       'id':id
    }
    return this.http
      .post(Configuration.RestApiURL + "services/category/delete.php", jsonobject,this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
   
  }
 

}
