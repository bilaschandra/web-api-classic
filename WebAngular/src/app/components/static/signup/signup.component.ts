import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/popup/modal.service';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/crudcalls/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
warning = ""
public user : User = new User();
validation: Object = {};

constructor(private modalService: ModalService, private login :LoginService) {
    this.user.Email
   }

  ngOnInit() {
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  switch(id:string){
    this.closeModal('signup');
    this.modalService.open(id);

  }

  validate() {
    this.validation = {};
    [
      'FirstName',
      'LastName',
      'UserName',
      'Email',
      'password',
    ].map(field => {
      if (!this.user[field]) {
        this.validation[field] = true;
      }
    });

    return Object.entries(this.validation).length === 0;
  }

  submit(){
    if (!this.validate()) {
      return;
    }

    this.login.register(this.user).subscribe(data=>{
      if(data['message'] != null){
        this.warning = data['message'];
        if(this.warning.toLowerCase() == "user was successfully registered."){
          this.closeModal('signup');
          alert("Registration complete, Please login.")
          return;
        }
        else{
          
        return;
        }
      }
        });
   
    
  this.user = null;
  this.user = new User();
  }

  ngOnDestroy(): void {
  this.user = null;
  this.user = new User();

  }
}
