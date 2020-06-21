export class Transaction {

    constructor(private _id: string = "",
                private _user_id: string = "",
                private _address_id: string = "",    
                private _invoice_no: string = "",
                private _transaction_no: string = "",
                private _status: boolean = true,
                private _Amount: number = null,
                private _currency: string = "",
                private _error_messaage: string = "",
                private _success_message: string = "",
                private _transaction_date: string =""
                ) { }


set id(_val: string) { this._id = _val; }
get id(): string { return this._id; }

set user_id(_val: string) { this._user_id = _val; }
get user_id(): string { return this._user_id; }

set address_id(_val: string) { this._address_id = _val; }
get address_id(): string { return this._address_id; }

set invoice_no(_val: string) { this._invoice_no = _val; }
get invoice_no(): string { return this._invoice_no; }

set transaction_no(_val: string) { this._transaction_no = _val; }
get transaction_no(): string { return this._transaction_no; }

set status(_val: boolean) { this._status = _val; }
get status(): boolean { return this._status; } 

set Amount(_val: number) { this._Amount = _val; }
get Amount(): number { return this._Amount; }

set currency(_val: string) { this._currency = _val; }
get currency(): string { return this._currency; }

set error_messaage(_val: string) { this._error_messaage = _val; }
get error_messaage(): string { return this._error_messaage; }

set success_message(_val: string) { this._success_message = _val; }
get success_message(): string { return this._success_message; }

set transaction_date(_val: string) { this._transaction_date = _val; }
get transaction_date(): string { return this._transaction_date; }

public objcpy(transaction: Transaction) {
    this._id = transaction.id;
    this._user_id = transaction.user_id;
    this._address_id = transaction.address_id;
    this._invoice_no = transaction.invoice_no;
    this._transaction_no =transaction.transaction_no;
    this._status = transaction.status;
    this._Amount = Number(transaction.Amount);
    this._currency = transaction.currency;
    this._error_messaage = transaction.error_messaage;
    this._success_message = transaction.success_message;
    this._transaction_date = transaction.transaction_date;
}

public bindHttpJson(data: {}): void {
    if (data["id"] != null) this.id = data["id"];
    if (data["user_id"] != null) this.user_id = data["user_id"];
    if (data["address_id"] != null) this.address_id = data["address_id"];
    if (data["invoice_no"] != null) this.invoice_no = data["invoice_no"];
    if (data["transaction_no"] != null) this.transaction_no = data["transaction_no"];
    if (data["status"] != null) this.status = data["status"];
    if (data["Amount"] != null) this.Amount = data["Amount"];    
    if (data["currency"] != null) this.error_messaage = data["currency"];
    if (data["error_message"] != null) this.error_messaage = data["error_message"];
    if (data["success_message"] != null) this.success_message = data["success_message"];
    if (data["transaction_date"] != null) this.success_message = data["transaction_date"];
}
}
