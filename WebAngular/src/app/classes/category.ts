export class Category {
    /**
     *
     */
    constructor(private _id: string = "",
        private _category: string = "",
        private _isactive: boolean = true,
        private _vendor: string[] = []) { }


    set id(_val: string) { this._id = _val; }
    get id(): string { return this._id; }

    set category(_val: string) { this._category = _val; }
    get category(): string { return this._category; }

    set isactive(_val: boolean) { this._isactive = _val; }
    get isactive(): boolean { return this._isactive; }

    set vendor(_val: string[]) { this._vendor = _val; }
    get vendor(): string[] { return this._vendor; }


    public objcpy(category: Category) {
        this._id = category.id;
        this._category = category.category;
        this._isactive = category.isactive;
        this._vendor = category.vendor;
    }

    public bindHttpJson(data: {}): void {
        if (data["id"] != null) this.id = data["id"];
        if (data["category"] != null) this.category = data["category"];
        if (data["isactive"] != null) this.isactive = data["isactive"];
        if (data["vendor"] != null) this.vendor = data["vendor"];
    }


}
