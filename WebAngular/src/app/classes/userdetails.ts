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

    public cpyobj(userdetails: Userdetails) {
        this._id =  userdetails.id;
        this._UserID = userdetails.UserID;
        this.contact_number = userdetails.contact_number;
        this.billing_street_address= userdetails.billing_street_address;
        this.billing_city_address= userdetails.billing_city_address;
        this.billing_state_address = userdetails._billing_state_address;
        this.billing_country_address = userdetails.billing_country_address;
        this.billing_zip = userdetails.billing_zip;
        this.shipping_street_address= userdetails.shipping_street_address;
        this.shipping_city_address= userdetails.shipping_city_address;
        this.shipping_state_address = userdetails._shipping_state_address;
        this.shipping_country_address = userdetails.shipping_country_address;
       this.shipping_zip = userdetails.shipping_zip;

    }


    public bindHttpJson(data: {}): void {
        if (data["id"] != null) this.id = data["id"];
        if (data["UserID"] != null) this.UserID = data["UserID"];
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
        
        
      


    }
    
}
/*
 `id` INT(20) NOT NULL AUTO_INCREMENT,
    `UserID` INT(10) NOT NULL,
    `contact_number` VARCHAR(100) NOT NULL DEFAULT '',
    `billing_street_address` VARCHAR(500) NOT NULL DEFAULT '',
    `billing_city_address` VARCHAR(200) NOT NULL DEFAULT '',
    `billing_state_address` VARCHAR(100) NOT NULL DEFAULT '',
    `billing_country_address` VARCHAR(200) NOT NULL DEFAULT '',
    `shipping_street_address` VARCHAR(500) NOT NULL DEFAULT '',
    `shipping_city_address` VARCHAR(500) NOT NULL DEFAULT '',
    `shipping_state_address` VARCHAR(500) NOT NULL DEFAULT '',
    `shipping_country_address` VARCHAR(500) NOT NULL DEFAULT '',
*/