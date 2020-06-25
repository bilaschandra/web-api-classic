export class Cart {
  
    constructor(
               
        private _id: string = "",
        private _product_name: string = "",        
        private _description: string = "",
        private _vendor: string = "",
        private _image_url: string = "",
        private _catergory:string = "", 
        private _varient: string = "",
        private _color: string = "",
        private _instock: boolean = true,       
        private _sell_price: string = "",
        private _discount: number = 0,
        private _quantity: number = 0,
        private _variend_id :string = ""
      
        ) { }

        set id(_val : string){this._id = _val;}
        get id() : string {return this._id;}

        set product_name(_val : string){this._product_name = _val;}
        get product_name() : string {return this._product_name;} 

        set description(_val : string){this._description = _val;}
        get description() : string {return this._description;}        

        set vendor(_val : string){this._vendor = _val;}
        get vendor() : string {return this._vendor;}        

        set image_url(_val : string){this._image_url = _val;}
        get image_url() : string {return this._image_url;}
 
        set catergory(_val : string){this._catergory = _val;}
        get catergory() : string {return this._catergory;}

        set varient(_val: string) { this._varient = _val; }
        get varient(): string { return this._varient; }
    
        set color(_val: string) { this._color = _val; }
        get color(): string { return this._color; }
    
        set instock(_val: boolean) { this._instock = _val; }
        get instock(): boolean { return this._instock; } 

        set sell_price(_val: string) { this._sell_price = _val; }
        get sell_price(): string { return this._sell_price; }
    
        set discount(_val: number) { this._discount = _val; }
        get discount(): number { return this._discount; }
    
        set quantity(_val: number) { this._quantity = _val; }
        get quantity(): number { return this._quantity; }

        
        set variend_id(_val: string) { this._variend_id = _val; }
        get variend_id(): string { return this._variend_id; }    


        
}
