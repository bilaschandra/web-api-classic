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


    public cpyobj(user: User) {
        this._UserID = user.UserID;
        this._User_role = user.User_role;
        this._UserName = user.UserName;
        this._Email = user.Email;
        this._FirstName = user.FirstName;
        this._LastName = user.LastName;
        this._ProflieImage_url = user.ProflieImage_url;
        this._password = user.password;
        this._isactive = user.isactive;

    }


    public bindHttpJson(data: {}): void {
        if (data["UserID"] != null) this.UserID = data["UserID"];
        if (data["User_role"] != null) this.User_role = data["User_role"];
        if (data["UserName"] != null) this.UserName = data["UserName"];
        if (data["Email"] != null) this.Email = data["Email"];
        if (data["FirstName"] != null) this.FirstName = data["FirstName"];
        if (data["LastName"] != null) this.LastName = data["LastName"];
        if (data["ProflieImage_url"] != null) this.ProflieImage_url = data["ProflieImage_url"];
        if (data["isactive"] != null) this.ProflieImage_url = data["isactive"];
     


    }


    

}
