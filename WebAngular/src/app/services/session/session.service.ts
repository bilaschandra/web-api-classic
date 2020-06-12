import { Injectable } from "@angular/core";
import {
  LocalStorageService,
  LocalStorage,
  SessionStorageService
} from "angular-web-storage";
@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(
    private localStorage: LocalStorageService,
    private localSession: SessionStorageService
  ) {}

  public setRememberMe(value: boolean) {
    this.localStorage.set("rememberme", value);
  }

  public getRememberMe(): boolean {
    return this.localStorage.get("rememberme");
  }
  
  public setRole(value: string) {
    
    this.localStorage.set("role", value);
    localStorage.setItem("role", value);
  }
  
  public getRole(): string {
    return this.localSession.get("role") != null ? this.localSession.get("role")  : localStorage.getItem("role");;
  }

  public getToken() {
    if (this.getRememberMe() == true) {
      return localStorage.getItem("token");
    }
    return this.localSession.get("token");
  }

  public setToken(value: string) {
    this.localSession.set("token", value, 86400);
    localStorage.setItem("token", value);
  }

  public getUserId() {
    if (this.getRememberMe() == true) {
      return localStorage.getItem("userid");
    }
    return this.localSession.get("userid");
  }

  public setUserId(value: string) {
    this.localSession.set("userid", value, 86400);
    localStorage.setItem("userid", value);
  }

  public isLoggedIn() {
    if (this.localSession.get("userid") != "") return true;
    else if (this.localStorage.get("userid") != "") {
      return true;
    } else {
      return false;
    }
  }

  public clear() {
    this.localStorage.clear();
    this.localSession.clear();
  }

  public getSessionID() {
    return this.localSession.get("SessionID");
  }

  public setSessionID(value) {
    return this.localSession.set("SessionID", value);
  }

  public getUUID() {
    if (
      this.localSession.get("UUID") == "" ||
      this.localSession.get("UUID") == null
    ) {
      var UUID = this.generateUUID();
      this.localSession.set("UUID", UUID);
      return UUID;
    } else {
      return this.localSession.get("UUID");
    }
  }

  private generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
