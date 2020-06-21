import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/classes/config/Configuration';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { Httpextension } from '../crudcalls/http/httpextension';
import { Transaction } from 'src/app/classes/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {


    httpextensions: Httpextension;
    constructor(
        private http: HttpClient,
        private session: SessionService
    ) {
        this.httpextensions = new Httpextension(this.session);
    }

    getAllTransaction() {
        return this.http
            .get(Configuration.RestApiURL + "/services/transaction/read.php", this.httpextensions.httpOptions)
            .pipe();
    }

    getAllTransactionInvoiceWise() {
        return this.http
            .get(Configuration.RestApiURL + "/services/transaction/invoice.php", this.httpextensions.httpOptions)
            .pipe()
    }

    updateTransaction(transaction: Transaction) {
        const obj = {
            id: transaction.id,
            status: transaction.status,
        }
        return this.http
            .post(Configuration.RestApiURL + "/services/transaction/update.php", obj, this.httpextensions.httpOptions)
            .pipe();

    }
}
