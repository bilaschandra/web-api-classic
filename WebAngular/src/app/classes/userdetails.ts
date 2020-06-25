export class Userdetails {
    
    constructor(private _id  :string = "" ,
    private _UserID  :string = "" ,
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
    private _shipping_zip :string = "") {
         
    }
    set  id(_val: string) { this._id = _val; }
    get  id(): string { return this._id; }

    set UserID(_val: string) { this._UserID = _val; }
    get UserID(): string { return this._UserID; }
    
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

}