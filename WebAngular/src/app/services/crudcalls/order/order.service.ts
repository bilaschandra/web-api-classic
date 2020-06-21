import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';
import { Httpextension } from '../http/httpextension';
import { SessionService } from '../../session/session.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/classes/cart';
import { Userdetails } from 'src/app/classes/userdetails';
import { Order } from 'src/app/classes/order';
import { Transaction } from 'src/app/classes/transaction';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpextensions: Httpextension;
  constructor(private http: HttpClient, private session: SessionService) { this.httpextensions = new Httpextension(this.session); }


  read() {

    return this.http
      .post(Configuration.RestApiURL + "services/order/read.php", this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }



  delete(id) {
    var jsonorder_obj = {
      "id": id,

    }
    return this.http
      .post(Configuration.RestApiURL + "services/order/delete.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }


  readid() {
    var jsonorder_obj = {
      "UserID": this.session.getUserId()

    }

    return this.http
      .post(Configuration.RestApiURL + "services/order/readid.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  create(order_obj: Cart, userinfo: Userdetails, total, saveinfo, transaction: Transaction) {

    var jsonorder_obj = {
      "user_id": (this.session.getUserId()),
      "product_id": Number(order_obj.id),
      "order_quantity": Number(order_obj.quantity),
      "contact_number": userinfo.contact_number.trim(),
      "billing_street_address": userinfo.billing_street_address.trim(),
      "billing_city_address": userinfo.billing_city_address.trim(),
      "billing_state_address": userinfo.billing_state_address.trim(),
      "billing_country_address": userinfo.billing_country_address.trim(),
      "billing_zip": userinfo.billing_zip.trim(),
      "shipping_street_address": userinfo.shipping_street_address.trim(),
      "shipping_city_address": userinfo.shipping_city_address.trim(),
      "shipping_state_address": userinfo.shipping_state_address.trim(),
      "shipping_country_address": userinfo.shipping_country_address.trim(),
      "shipping_zip": userinfo.shipping_zip.trim(),
      "varient_id": order_obj.variend_id.trim(),
      "subtotal": total,
      "saveinfo": saveinfo,
      // "inovice_no" :transaction.invocie_no,
      // "tarnsaction" : transaction.transaction_no,
      // "transaction_status" :transaction.status
      "transaction": transaction


    }

    return this.http
      .post(Configuration.RestApiURL + "/services/order/create.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  sendmail(mailbody, reciver) {

    var jsonorder_obj = {
      "textmessage": mailbody.trim(),
      "reciver": reciver.trim()
    }

    return this.http
      .post(Configuration.RestApiURL + "utilities/Email/sendmail.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );

  }


  update(order_obj: Order) {

    var jsonorder_obj = {
      "order_id": Number(order_obj.id),
      "order_quantity": Number(order_obj.order_quantity),
      "contact_number": order_obj.contact_number.trim(),
      "billing_street_address": order_obj.billing_street_address.trim(),
      "billing_city_address": order_obj.billing_city_address.trim(),
      "billing_state_address": order_obj.billing_state_address.trim(),
      "billing_country_address": order_obj.billing_country_address.trim(),
      "billing_zip": order_obj.billing_zip.trim(),
      "shipping_street_address": order_obj.shipping_street_address.trim(),
      "shipping_city_address": order_obj.shipping_city_address.trim(),
      "shipping_state_address": order_obj.shipping_state_address.trim(),
      "shipping_country_address": order_obj.shipping_country_address.trim(),
      "shipping_zip": order_obj.shipping_zip.trim(),
      "subtotal": Number(order_obj.order_total_price),
      "issue_date": order_obj.issue_date.trim(),
      "delivered_date": order_obj.delivered_date.trim(),
      "status": order_obj.status,


    }

    return this.http
      .post(Configuration.RestApiURL + "services/order/update.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe(
        // Error handling to be added here
      );
  }

  orderItemDetails(orderId) {
    var jsonorder_obj = {
      "id": orderId,
    }

    return this.http
      .post(Configuration.RestApiURL + "services/order/details.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe();
  }

  orderItemDetailsByInvoice(invoiceNo) {
    var jsonorder_obj = {
      "invoice_no": invoiceNo,
    }

    return this.http
      .post(Configuration.RestApiURL + "services/order/invoice.php", jsonorder_obj, this.httpextensions.httpOptions)
      .pipe();
  }
}
