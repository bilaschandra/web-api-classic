export class User {



    constructor(
        private _UserID: string = "",
        private _User_role: string = "",
        private _UserName: string = "",
        private _Email: string = "",
        private _FirstName: string = "",
        private _LastName: string = "",
        private _ProflieImage_url: string = "",
        private _password:string ="",
        private _isactive:string = ""
    ) { }


    set UserID(_val: string) { this._UserID = _val; }
    get UserID(): string { return this._UserID; }

    set User_role(_val: string) { this._User_role = _val; }
    get User_role(): string { return this._User_role; }

    set UserName(_val: string) { this._UserName = _val; }
    get UserName(): string { return this._UserName; }

    set Email(_val: string) { this._Email = _val; }
    get Email(): string { return this._Email; }

    set FirstName(_val: string) { this._FirstName = _val; }
    get FirstName(): string { return this._FirstName; }

    set LastName(_val: string) { this._LastName = _val; }
    get LastName(): string { return this._LastName; }

    set ProflieImage_url(_val: string) { this._ProflieImage_url = _val; }
    get ProflieImage_url(): string { return this._ProflieImage_url; }

    set password(_val: string) { this._password = _val; }
    get password(): string { return this._password; }

    set isactive(_val: string) { this._isactive = _val; }
    get isactive(): string { return this._isactive; }


       

}
