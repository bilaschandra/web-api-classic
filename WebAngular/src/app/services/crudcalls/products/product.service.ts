import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';
import { Httpextension } from '../http/httpextension';
import { SessionService } from '../../session/session.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/classes/product';
import { Productattributes } from 'src/app/classes/productattributes';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpextensions: Httpextension;
  constructor(private http: HttpClient, private session: SessionService) { this.httpextensions = new Httpextension(this.session); }



  read() {
  
    return this.http
      .post(Configuration.RestApiURL + "services/product/read.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  readid(id) {
  
    var trimmedJSONObj = {
      "id" : id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readid.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }
  readcatid(cat_id) {
  
    var trimmedJSONObj = {
      "id" : cat_id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readcatid.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  readproductdetail(prod_id){
    var trimmedJSONObj = {
      "id" : prod_id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readproductdetail.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  readProductAttrDetail(product_attribute_id){
    var trimmedJSONObj = {
      "id" : product_attribute_id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readproductattrdetail.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }


  read_detail(){
    

    return this.http
      .post(Configuration.RestApiURL + "services/product/read_detail.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  readproductimages(prod_id){
    var trimmedJSONObj = {
      "id" : prod_id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readproductimages.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  readvendorid(id) {

    var trimmedJSONObj = {
      "vendor_id" : id      
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/readvendorid.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  

  getmaxprice() {
  
    return this.http
      .post(Configuration.RestApiURL + "services/product/maxprice.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  createproduct(product:Product)
  {
    var trimmedJSONObj = {  
      "product_name" : product.product_name.trim(),
      "vendor" : product.vendor.trim(),
      "description":product.description.trim(),
      "category_id" : product.category_id
    }

    return this.http
      .post(Configuration.RestApiURL + "services/product/create.php",trimmedJSONObj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );

  }

  creatproductimages(coverimage:any,image1 :any,image2 :any,image3:any,image4 :any, id){
    var jsonobj = {
      "coverimage": coverimage,
      "image1" : image1,
      "image2" : image2,
      "image3" : image3,
      "image4" : image4,
      "product_id" : id
    }

    return this.http
    .post(Configuration.RestApiURL + "services/product/createimages.php",jsonobj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );

  }

   createproductdetails(details : Productattributes){
    var jsonobj = {
      "product_id":details.product_id.toString().trim(),
      "color_option":details.color.toString().trim(),
      "varient":details.varient.toString().trim(),
      "purchase_price":details.purchase_price.toString().trim(),
      "sell_price":details.sell_price.toString().trim(),
      "quantity":details.quantity.toString().trim(),
      "discount":details.discount.toString().trim()
    }

    return this.http
    
    .post(Configuration.RestApiURL + "services/product/create_product_details.php",jsonobj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );

  }

  deleteproduct(id){
    var jsonobj = {
      "product_id":id      
    }
    return this.http
    
    .post(Configuration.RestApiURL + "services/product/delete.php",jsonobj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }

  
  deletevarient(id){
    var jsonobj = {
      "id":id      
    }
    return this.http
    
    .post(Configuration.RestApiURL + "services/product/deletevarient.php",jsonobj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }


  updateproduct(product:Product){ 
    
    var trimmedJSONObj = {  
      "id" : product.id,
      "product_name" : product.product_name.trim(),
      "vendor" : product.vendor.trim(),
      "description":product.description.trim(),
      "category_id" : product.category_id
    }
    return this.http
    
    .post(Configuration.RestApiURL + "services/product/update.php",trimmedJSONObj,this.httpextensions.httpOptions)
    .pipe(
      // Error handling to be added here
    );
  }

  updatevarient(details:Productattributes){   
  
    var jsonobj = {
      "product_id":details.product_id.toString().trim(),
      "color_option":details.color.toString().trim(),
      "varient":details.varient.toString().trim(),
      "purchase_price":details.purchase_price.toString().trim(),
      "sell_price":details.sell_price.toString().trim(),
      "quantity":details.quantity.toString().trim(),
      "discount":details.discount.toString().trim(),
      "id" : details.id
    }
  return this.http
  
  .post(Configuration.RestApiURL + "services/product/updatevarient.php",jsonobj,this.httpextensions.httpOptions)
  .pipe(
    // Error handling to be added here
  );
}
 
}
