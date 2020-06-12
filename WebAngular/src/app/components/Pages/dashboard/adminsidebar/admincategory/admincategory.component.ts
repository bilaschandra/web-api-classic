import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/crudcalls/category/category.service';
import { Category } from 'src/app/classes/category';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.scss']
})
export class AdmincategoryComponent implements OnInit {
  @Input() type: string = "";
  iscreate: boolean = true;
  isedit: boolean = false;
  isdelete: boolean = false;
  Category: string = "";
  opendd: number = -1;
  catitems = new Array<Category>();
  selectedcat : string;
  selectedvalue : string;



  constructor(private cateroryservice: CategoryService) {

    this.cateroryservice.readcategoryadmin().subscribe(Data => {
      if (Data['records'] != null) {

        Data['records'].forEach(element => {
          this.catitems.push(new Category(element['id'], element['category'], element['isactive'], []))
        });
      }
      else {
        console.log("http call error!! ")
        return;
      }
    });
  }

  ngOnInit() {
  }


  selectedtab(value: string) {
    switch (value) {
      case 'Create':
        this.iscreate = true;
        this.isedit = false;
        this.isdelete = false;
        break;
      case 'Edit':

        this.iscreate = false;
        this.isedit = true;
        this.isdelete = false;

        break;
      case 'Delete':

        this.iscreate = false;
        this.isedit = false;
        this.isdelete = true;

        break;
      default:
        this.iscreate = true;
        this.isedit = false;
        this.isdelete = false;
        break;
    }

  }

  save() {
    if (this.Category == "") {
      alert('please select Category')
      return;
    }

    this.cateroryservice.create(this.Category).subscribe(arg => {
      if (arg['status'] == "200") {
        alert('Category created !!!');
      }
    });



  }

  edit(id,status,category) {
    if (category == "") {
      alert('please select Category')
      return;
    }

    this.cateroryservice.edit(category, id, status).subscribe(arg => {
      if (arg['status'] == "200") {
        alert('Category edited !!!');
      }
    });
  }

  delete(id) {
    let index =this.catitems.findIndex(d => d.id == id);
if (index > -1) {
  this.catitems.splice(index, 1);
}

    this.cateroryservice.delete(id).subscribe(arg => {
      if (arg['status'] == "200") {
        alert('Category delete !!!');
      }
    });
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

  savecat(value:Category){
    this.edit(value.id,value.isactive,value.category);
  }

  test(a){
    console.log(a);
  }
}
