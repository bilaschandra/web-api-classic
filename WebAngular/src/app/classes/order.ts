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
    
   
}
