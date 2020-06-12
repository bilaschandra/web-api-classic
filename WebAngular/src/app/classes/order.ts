export class Order {

    constructor(private _id : string = "",
        private _user_id: string = "",
        private _product_id: string = "",
        private _issue_date: string = "",
        private _delivered_date: string = "",
        private _status: string = "",
        private _order_quantity: string = "",
        private _order_total_price:string = "",
        private _contact_number  :string = "" ,
        private _billing_street_address  :string = "" ,
        private _billing_city_address  :string = "" ,
        private _billing_state_address  :string = "" ,
        private _billing_country_address  :string = "" ,
        private _shipping_street_address  :string = "" ,
        private _shipping_city_address  :string = "" ,
        private _shipping_state_address  :string = "" ,
        private _shipping_country_address  :string = "" ,
        private _billing_zip :string = "",
        private _shipping_zip :string = "",
        private _invoice :string ="") { }

    set id(_val: string) { this._id = _val; }
    set user_id(_val: string) { this._user_id = _val; }
    set product_id(_val: string) { this._product_id = _val; }
    set issue_date(_val: string) { this._issue_date = _val; }
    set delivered_date(_val: string) { this._delivered_date = _val; }
    set status(_val: string) { this._status = _val; }
    get status(): string { return this._status; }
  
    set order_quantity(_val: string) { this.order_quantity = _val; }
    get id(): string { return this._id; }
    get user_id(): string { return this._user_id; }
    get product_id(): string { return this._product_id; }
    get issue_date(): string { return this._issue_date; }
    get delivered_date(): string { return this._delivered_date; }
    get order_quantity(): string { return this._order_quantity; }

    set order_total_price(_val: string) { this._order_total_price = _val; }
    get order_total_price(): string { return this._order_total_price; }
    set contact_number(_val: string) { this._contact_number = _val; }
    get contact_number(): string { return this._contact_number; }

    set  billing_street_address(_val: string) { this._billing_street_address = _val; }
    get  billing_street_address(): string { return this._billing_street_address; }
   
    set  billing_city_address(_val: string) { this._billing_city_address = _val; }
    get  billing_city_address(): string { return this._billing_city_address; }

    set  billing_state_address(_val: string) { this._billing_state_address = _val; }
    get  billing_state_address(): string { return this._billing_state_address; }


    set  billing_country_address(_val: string) { this._billing_country_address = _val; }
    get  billing_country_address(): string { return this._billing_country_address; }

    
    set  billing_zip(_val: string) { this._billing_zip = _val; }
    get  billing_zip(): string { return this._billing_zip; }

    set  shipping_street_address(_val: string) { this._shipping_street_address = _val; }
    get  shipping_street_address(): string { return this._shipping_street_address; }
  
    set  shipping_city_address(_val: string) { this._shipping_city_address = _val; }
    get  shipping_city_address(): string { return this._shipping_city_address; }

    set  shipping_state_address(_val: string) { this._shipping_state_address = _val; }
    get  shipping_state_address(): string { return this._shipping_state_address; }

    set  shipping_country_address(_val: string) { this._shipping_country_address = _val; }
    get  shipping_country_address(): string { return this._shipping_country_address; }

    set shipping_zip(_val: string) { this._shipping_zip = _val; }
    get  shipping_zip(): string { return this._shipping_zip; }

    set invoice(_val: string) { this._invoice = _val; }
    get invoice(): string { return this._invoice; }


    
   
    //set order_total_price


    public cpyobj(order: Order) {
        this._id = order.id;
        this._user_id = order.user_id;
        this._product_id = order.product_id;
        this._issue_date = order.issue_date;
        this._delivered_date = order.delivered_date;
        this._status = order.status;
        this._order_quantity = order.order_quantity;
        this._order_total_price = order.order_total_price;
        this._contact_number = order.contact_number;
        this._billing_street_address= order.billing_street_address;
        this._billing_city_address= order.billing_city_address;
        this._billing_state_address = order._billing_state_address;
        this._billing_country_address = order.billing_country_address;
        this._billing_zip = order.billing_zip;
        this._shipping_street_address= order.shipping_street_address;
        this._shipping_city_address= order.shipping_city_address;
        this._shipping_state_address = order._shipping_state_address;
        this._shipping_country_address = order.shipping_country_address;
        this._shipping_zip = order.shipping_zip;
        this._invoice = order.invoice;
    }

    public bindHttpJson(data: {}): void {
        if (data["id"] != null) this.id = data["id"];
        if (data["user_id"] != null) this.user_id = data["user_id"];
        if (data["product_id"] != null) this.product_id = data["product_id"];
        if (data["issue_date"] != null) this.issue_date = data["issue_date"];
        if (data["delivered_date"] != null) this.delivered_date = data["delivered_date"];
        if (data["status"] != null) this.status = data["status"];
        if (data["order_quantity"] != null) this.order_quantity = data["order_quantity"];
        if (data["order_total_price"] != null) this.order_total_price = data["order_total_price"];
        if (data["contact_number"] != null) this.contact_number = data["contact_number"];
        if (data["billing_street_address"] != null) this.billing_street_address = data["billing_street_address"];
        if (data["billing_city_address"] != null) this.billing_city_address = data["billing_city_address"];
        if (data["billing_state_address"] != null) this.billing_state_address = data["billing_state_address"];
        if (data["billing_country_address"] != null) this.billing_country_address = data["billing_country_address"];
        if (data["billing_zip"] != null) this.billing_zip = data["billing_zip"];
        if (data["shipping_street_address"] != null) this.shipping_street_address = data["shipping_street_address"];
        if (data["shipping_city_address"] != null) this.shipping_city_address = data["shipping_city_address"];
        if (data["shipping_state_address"] != null) this.shipping_state_address = data["shipping_state_address"];
        if (data["shipping_country_address"] != null) this.shipping_country_address = data["shipping_country_address"];
        if (data["shipping_zip"] != null) this.shipping_zip = data["shipping_zip"];
        if (data["invoice_id"] != null) this.invoice = data["invoice_id"];
        
       
    }
}
