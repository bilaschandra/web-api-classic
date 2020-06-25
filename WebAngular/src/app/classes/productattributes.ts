export class Productattributes {

    constructor(
        private _id: string = "",
        private _product_id: string = "",
        private _varient: string = "",
        private _color: string = "",
        private _instock: string = "",
        private _purchase_price: string = "",
        private _sell_price: string = "",
        private _discount: number = 0,
        private _quantity: number = 0
    ) { }


    set id(_val: string) { this._id = _val; }
    get id(): string { return this._id; }

    set product_id(_val: string) { this._product_id = _val; }
    get product_id(): string { return this._product_id; }

    set varient(_val: string) { this._varient = _val; }
    get varient(): string { return this._varient; }

    set color(_val: string) { this._color = _val; }
    get color(): string { return this._color; }

    set instock(_val: string) { this._instock = _val; }
    get instock(): string { return this._instock; }

    set purchase_price(_val: string) { this._purchase_price = _val; }
    get purchase_price(): string { return this._purchase_price; }

    set sell_price(_val: string) { this._sell_price = _val; }
    get sell_price(): string { return this._sell_price; }

    set discount(_val: number) { this._discount = _val; }
    get discount(): number { return this._discount; }

    set quantity(_val: number) { this._quantity = _val; }
    get quantity(): number { return this._quantity; }


}





