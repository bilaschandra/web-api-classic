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

}
