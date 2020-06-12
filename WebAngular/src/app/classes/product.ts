export class Product {

    constructor(
        private _id: string = "",
    
        private _product_name: string = "",
        private _category_id: string = "",
        private _purchase_price: string = "",
        private _sell_price: string = "",
        private _description: string = "",
        private _vendor: string = "",
        private _image_url: string = "",
        private _catergory:string = "",
        private _instock:boolean =true,
        private _discount:number =0,
        private _create_date :string ="",
         ) {    }




        set id(_val : string){this._id = _val;}
        get id() : string {return this._id;}

        set product_name(_val : string){this._product_name = _val;}
        get product_name() : string {return this._product_name;}
        

        set category_id(_val : string){this._category_id = _val;}
        get category_id() : string {return this._category_id;}
        

        set purchase_price(_val : string){this._purchase_price = _val;}
        get purchase_price() : string {return this._purchase_price;}


        set sell_price(_val : string){this._sell_price = _val;}
        get sell_price() : string {return this._sell_price;}
        

        set description(_val : string){this._description = _val;}
        get description() : string {return this._description;}
        

        set vendor(_val : string){this._vendor = _val;}
        get vendor() : string {return this._vendor;}
        

        set image_url(_val : string){this._image_url = _val;}
        get image_url() : string {return this._image_url;}
 
        set catergory(_val : string){this._catergory = _val;}
        get catergory() : string {return this._catergory;}

        set instock(_val : boolean){this._instock = _val;}
        get instock() : boolean {return this._instock;}


        set discount(_val : number){this._discount = _val;}
        get discount() : number {return this._discount;}

        set create_date(_val : string){this._create_date = _val;}
        get create_date() : string {return this._create_date;}
        
         

        public cpyobj (product: Product){
            this._id= product.id ;   
            this._product_name= product.product_name ;
            this._category_id= product.category_id ;
            this._purchase_price= product.purchase_price ;
            this._sell_price= product.sell_price ;
            this._description= product.description ;
            this._vendor= product.vendor ;
            this._image_url = product.image_url;
            this._catergory = product.catergory;
            this._instock = product.instock;
            this._discount = product.discount;
            this._create_date = product.create_date;
        }
 
        public bindHttpJson(data : {}) : void {
            if (data["id"] != null)        this.id = data["id"];
                 
                if (data["product_name"] != null)           this.product_name = data["product_name"];
                if (data["category_id"] != null)            this.category_id = data["category_id"];
                if (data["purchase_price"] != null)         this.purchase_price = data["purchase_price"];
                if (data["sell_price"] != null)             this.sell_price = data["sell_price"];
                if (data["description"] != null)            this.description = data["description"];
                if (data["vendor"] != null)                 this.vendor = data["vendor"];
                if (data["image_url"] != null)              this.image_url = data["image_url"];
                if (data["catergory"] != null)              this.catergory = data["catergory"];
                if (data["instock"] != null)                this.instock = data["instock"];             
                if (data["discount"] != null)               this.discount = data["discount"];     
                if (data["create_date"] != null)            this.create_date = data["create_date"];              
        }     
    }

  