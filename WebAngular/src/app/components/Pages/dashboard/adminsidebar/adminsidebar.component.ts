import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';
import { Configuration } from 'src/app/classes/config/Configuration';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';

export type Config = {
  // selector?: String,
  multi?: boolean
};


@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.scss']
})
export class AdminsidebarComponent implements OnInit {

  items: string[]= new Array<string>() ;
  config: Config;
  options: Config = { multi: false }
  public opendd: number = 0;
  type :string = 'category';
  public profileimg = "http://trovacamporella.com/img/trovacamporella-fiat500.png";
  user: User = new User();

  constructor(private sessionservice :SessionService,private userservice:UserService,private router :Router) { 
    this.items.push("Category","Order","User","Product");
    this.getuser();
  }

  
  toggle(id: number): void {

    if (this.opendd == id) {
      this.opendd = -1;
       
    }
    else {
      this.opendd = id;  }
  }

  ngOnInit() {
    
    this.config = this.mergeConfig(this.options);
  }

  

  mergeConfig(options: Config) {

    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  optselected(value:string){
    this.type = value.toLowerCase();
  }



  getuser() {
    this.userservice.readuser().subscribe(data => {
      if (data['records'] != null) {
        data['records'].forEach(element => {
          this.user.FirstName = element['FirstName'];
          this.user.LastName = element['LastName'];
          this.user.Email = element['Email'];
          this.user.UserName = element['UserName'];
          this.user.ProflieImage_url = element['ProflieImage_url'];
          this.user.UserID = this.sessionservice.getUserId();
          this.profileimg = Configuration.RestApiURL + this.user.ProflieImage_url
           
        });
      }
    });

  }

  logout(){
    this.sessionservice.clear();
    this.router.navigate(['/']);
  }
}
