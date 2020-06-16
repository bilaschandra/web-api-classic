import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { SessionService } from 'src/app/services/session/session.service';
import { Userdetails } from 'src/app/classes/userdetails';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Configuration } from 'src/app/classes/config/Configuration';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  user: User = new User();
  userdetails: Userdetails = new Userdetails();
  isshippingdifferernt: boolean = false;
  savedisable = true;
  edit = true;
  prfileimage: string | ArrayBuffer ="../../../../assets/add.svg"
  imgflag: boolean = false;
  constructor(private session: SessionService, private userservice: UserService, private router: Router) {
    
    if (this.session.getUserId() == null ){

      this.router.navigate(['/']);
      return;
    }
    this.getuser();
    this.getuserdetails();
  }

  ngOnInit() {
  }

  showshipping() {
   
    
    if (this.isshippingdifferernt == true) {
      this.userdetails.shipping_country_address = this.userdetails.billing_country_address;
      this.userdetails.shipping_state_address = this.userdetails.billing_state_address;
      this.userdetails.shipping_street_address = this.userdetails.billing_street_address;
      this.userdetails.shipping_city_address = this.userdetails.billing_city_address;
      this.userdetails.shipping_zip = this.userdetails.billing_zip;
    }
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
          this.user.UserID = this.session.getUserId();
          this.prfileimage = Configuration.RestApiURL + this.user.ProflieImage_url;
          this.prfileimage = this.user.ProflieImage_url ?
            Configuration.RestApiURL + this.user.ProflieImage_url
            : 'http://trovacamporella.com/img/trovacamporella-fiat500.png';
          
        });
      }
    });

  }
  getuserdetails() {
    this.userservice.readuserdetails().subscribe(data => {
      if (data['records'] != null) {
        data['records'].forEach(element => {
          this.userdetails.id = element['id'];
          this.userdetails.UserID = element['UserID'];
          this.userdetails.contact_number = element['contact_number'];
          this.userdetails.billing_street_address = element['billing_street_address'];
          this.userdetails.billing_city_address = element['billing_city_address'];
          this.userdetails.billing_state_address = element['billing_state_address'];
          this.userdetails.billing_country_address = element['billing_country_address'];
          this.userdetails.billing_zip = element['billing_zip'];
          this.userdetails.shipping_street_address = element['shipping_street_address'];
          this.userdetails.shipping_city_address = element['shipping_city_address'];
          this.userdetails.shipping_state_address = element['shipping_state_address'];
          this.userdetails.shipping_country_address = element['shipping_country_address'];
          this.userdetails.shipping_zip = element['shipping_zip'];
 
        });
      }
    })

  }

  editprofile() {
    this.edit = !this.edit;
  }

  cancle() {
    this.edit = !this.edit;
  }

  save() {
    this.showshipping();
    if(this.imgflag)
    { this.userservice.createprofileimage(this.user.UserID,this.prfileimage).subscribe();
    
    }
    if (this.userdetails.contact_number == null || this.userdetails.contact_number == "") { alert('  ​​​​contact number'); return; }
    if (this.userdetails.billing_street_address == null || this.userdetails.billing_street_address == "") { alert('  ​​​​billing street address'); return; }
    if (this.userdetails.billing_city_address == null || this.userdetails.billing_city_address == "") { alert('  ​​​​billing city address'); return; }
    if (this.userdetails.billing_state_address == null || this.userdetails.billing_state_address == "") { alert('  ​​​​billing state address '); return; }
    if (this.userdetails.billing_country_address == null || this.userdetails.billing_country_address == "") { alert('  ​​​​billing countr address '); return; }
    if (this.userdetails.billing_zip == null || this.userdetails.billing_zip == "") { alert('  ​​​​billing zip     '); return; }
    if (this.userdetails.shipping_street_address == null || this.userdetails.shipping_street_address == "") { alert('  ​​​​shipping street address     '); return; }
    if (this.userdetails.shipping_city_address == null || this.userdetails.shipping_city_address == "") { alert('  ​​​​shipping city address     '); return; }
    if (this.userdetails.shipping_state_address == null || this.userdetails.shipping_state_address == "") { alert('  ​​​​shipping state address'); return; }
    if (this.userdetails.shipping_country_address == null || this.userdetails.shipping_country_address == "") { alert('  ​​​​shipping country address'); return; }
    if (this.userdetails.shipping_zip == null || this.userdetails.shipping_zip == "") { alert('  ​​​​shipping zip'); return; }
    if (this.user.FirstName == null || this.user.FirstName == "") { alert('  ​​​​FirstName    '); return; }
    if (this.user.LastName == null || this.user.LastName == "") { alert('  ​​​​LastName'); return; }
    if (this.user.Email == null || this.user.Email == "") { alert('  ​​​​Email   '); return; }
    if (this.user.UserName == null || this.user.UserName == "") {      alert('  ​​​​UserName'); return;    }
   

    this.userservice.updateuser(this.user).subscribe();
    this.userdetails.UserID = this.user.UserID;
    this.userservice.updateuserdetails(this.userdetails).subscribe();
    alert("Informated have been update");
    this.router.navigate(['./']);
    


  }

  public handleFileInput(event, id) {
    this.imgflag = true;
    var content = event.target.files[0];


    if (content.length === 0)
      return;


    if (content.type != null && content.type.match(/image\/*/) == null) {
      alert("Please Select an image.")
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(content);
    reader.onload = (_event) => {

      this.prfileimage = reader.result;
    

    }
  }

  public openexplorer(id) {


    var element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.click();
    return;


  }

}
