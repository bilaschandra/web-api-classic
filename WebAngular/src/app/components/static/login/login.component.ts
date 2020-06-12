import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/popup/modal.service';

import { SessionService } from 'src/app/services/session/session.service';
import { LoginService } from 'src/app/services/crudcalls/login/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  warningMsg: string;
  password: string;

  constructor(private modalService: ModalService, private sessionService: SessionService, private loginService: LoginService,private router : Router) { 
    
  }

  ngOnInit() {
  }
  closeModal(id: string) {

    this.modalService.close(id);

  }

  switch(id: string) {
    this.closeModal('login');
    this.modalService.open(id);

  }

  login() {

    if (this.username == "" || this.username == undefined) {
      this.warningMsg = "Please enter your username";
      return;
    }
    if (this.password == "" || this.password == undefined) {
      this.warningMsg = "Please enter your password";
      return;
    }
    var trimmedJSONObj = {
      "username": this.username,
      "password": this.password
    }

    this.loginService.login(trimmedJSONObj)
      .subscribe(
        data => {
          if (data['status'] == "200") {
            
            this.sessionService.setToken(data['jwt']);
            this.sessionService.setUserId(data['userid']);
            this.sessionService.setRole(data['role']);
            this.modalService.close('login');
            if (this.sessionService.getRole() != null &&  this.sessionService.getRole().toLowerCase() == "admin"){
              this.router.navigate(['/dashboard'])
              
            }
      
          }
          else{
            this.warningMsg =data['message'];
          } 

        }
      );
     
  }

  public logout() {

    this.sessionService.clear();
  }

}
