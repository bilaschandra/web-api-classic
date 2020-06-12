import { HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../session/session.service';

export class Httpextension {

session : SessionService;


httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};


public constructor(_session : SessionService)
{
    this.session = _session;
}

public GetSession(){
    var token = {'JWT' : this.session.getToken(),
                 'UserID' : this.session.getUserId()};
    var json = JSON.stringify(token);

    return json;
  }

public AddSessionAndStringify(json){

    if(!json.hasOwnProperty('JWT')){
        json['JWT'] = this.session.getToken();
    }

    if(!json.hasOwnProperty('UserID')){
        json['UserID'] = this.session.getUserId();
    }

    var stringified = JSON.stringify(json);

    return stringified;
}
}