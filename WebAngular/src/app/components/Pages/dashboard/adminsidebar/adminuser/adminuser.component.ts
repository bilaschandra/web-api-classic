import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/classes/user';
import { LoginService } from 'src/app/services/crudcalls/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.scss']
})
export class AdminuserComponent implements OnInit {
  @Input() type : string ="";
  public user : User = new User();  
  iscreate : boolean =true;  
  isedit : boolean =false;  
  isdelete : boolean =false;
  public edituser :User[] = new Array<User>();
  opendd: number = -1;
  selected : string;
   filterValue :string;
  
  constructor(private login :LoginService, private userservice:UserService) {
  this.getusers();
   }

  ngOnInit() {
  }


  selectedtab(value:string)
  {
    switch (value) {
      case  'Create':
        this.iscreate =true;
        this.isedit = false;
        this.isdelete = false;
        break;
        case 'Edit':
          
        this.iscreate =false;
        this.isedit = true;
        this.isdelete = false;
        
          break;
          case 'Delete':
            
        this.iscreate =false;
        this.isedit = false;
        this.isdelete = true;
        
            break;
      default:        
          this.iscreate =true;
          this.isedit = false;
          this.isdelete = false;
        break;
    }

  }


  getusers(){
    this.userservice.readalluser().subscribe(data=>{
      if (data['records'] == null )
      return;

      data['records'].forEach(element => {
        
       this.edituser.push(new User(element['UserID'],element['User_role'],element['UserName'], element['Email'],element['FirstName'],  element['LastName'],element['ProflieImage_url'], "", element['isactive'] ))
      
          
      });
    })
  }

 
  deleteuses(id){
    let index =this.edituser.findIndex(d => d.UserID == id);
    if (index > -1) {this.edituser.splice(index, 1);}
    this.userservice.deleteuser(id).subscribe();
  }

  createuser(){
    this.login.register(this.user).subscribe();
  this.user = null;
  this.user = new User();
  

  }


  saveuser(item:User){
   
    if (item.UserName == "" ){
      alert("Please enter User name.");
      return;
    }
    if (item.FirstName == "" ){
      alert("Please enter First Name");
      return;
    }
    if (item.LastName == "" ){
      alert("Please enter Last Name");
      return;
    }
    if (item.Email == "" ){
      alert("Please enter Email,");
      return;
    }
 
    this.userservice.updateuseradmin(item).subscribe();

  }

  toggle(catId): void {

    if (catId == this.opendd) {
      this.opendd = -1;

      (document.getElementById('status_' + catId) as HTMLInputElement).disabled = true;

      var element= document.getElementById('add_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;

    }
    else {
    this.opendd = catId;

    (document.getElementById('status_' + catId) as HTMLInputElement).disabled = false;

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('add_' + catId);
      element.style.display = null;
    }
  }

}
