import { Component, OnInit, Input } from '@angular/core';
import { Productattributes } from 'src/app/classes/productattributes';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';
import { Product } from 'src/app/classes/product';
import { CategoryService } from 'src/app/services/crudcalls/category/category.service';
import { Category } from 'src/app/classes/category';
import { Configuration } from 'src/app/classes/config/Configuration';
;



@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.scss']
})
export class AdminproductComponent implements OnInit {
  @Input() type: string = "";
  coverimage: any = '../../../../../../assets/add.svg';
  image1: any = '../../../../../../assets/add.svg';
  image2: any = '../../../../../../assets/add.svg';
  image3: any = '../../../../../../assets/add.svg';
  image4: any = '../../../../../../assets/add.svg';
  catitems: Category[] = new Array<Category>();
  selected: string;
  filterValue: string

  attributes: Productattributes[] = new Array<Productattributes>()
  product: Product = new Product();
  allproducts: Product[] = new Array<Product>();
  flag: boolean;
  iscreate: boolean = true;
  isedit: boolean = false;
  isdelete: boolean = false;
  isdeletevarient: boolean = false
  attributes_db: Productattributes[] = new Array<Productattributes>();
  issaveable = true;
  opendd: any;
  constructor(private productservice: ProductService, private cateroryservice: CategoryService) {
    this.attributes.push(new Productattributes("", "", "", "", "", "", "", null, null));

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
    this.loadproducts();
    this.productservice.read_detail().subscribe(data => {
      if (data["records"] != null) {
        data["records"].forEach(element => {
          this.attributes_db.push(new Productattributes(element['id'], element['product_id'], element['varient'], element['color_option'], element['instock'], element['purchase_price'], element['sell_price'], element['discount'], element['quantity']))
        });
      }
    })


  }

  ngOnInit() {
  }



  selectedtab(value: string) {
    switch (value) {
      case 'Create':
        this.iscreate = true;
        this.isedit = false;
        this.isdelete = false;
        this.isdeletevarient = false;
        break;
      case 'Edit':

        this.iscreate = false;
        this.isedit = true;
        this.isdelete = false;
        this.isdeletevarient = false;

        break;
      case 'Delete':

        this.iscreate = false;
        this.isedit = false;
        this.isdelete = true;
        this.isdeletevarient = false;

        break;
      case 'Deletevarient':

        this.iscreate = false;
        this.isedit = false;
        this.isdelete = false;
        this.isdeletevarient = true;

        break;
      default:
        this.iscreate = true;
        this.isedit = false;
        this.isdelete = false;
        this.isdeletevarient = false;
        break;
    }

  }

  public handleFileInput(event, id) {
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


      switch (id) {
        case 'coverimage':
          this.coverimage = reader.result;
          break;

        case 'image1':
          this.image1 = reader.result;

          break;

        case 'image2':
          this.image2 = reader.result;
          break;

        case 'image3':
          this.image3 = reader.result;
          break;

        case 'image4':
          this.image4 = reader.result;
          break;
      }

    }
  }

  public openexplorer(id) {


    var element: HTMLElement = document.getElementById(id) as HTMLElement;
    element.click();
    return;


  }

  public Additeration() {

    this.attributes.forEach(element => {

      if (element.sell_price != null && Number(element.sell_price) > 0 && element.sell_price.toString().trim() != "") { this.flag = true; }
      else { this.flag = false; }
    });
    if (this.flag) {
      this.issaveable = false;
      this.attributes.push(new Productattributes("", "", "", "", "", "", "", null, null));

    }
  }

  public create() {
    this.productservice.createproduct(this.product).subscribe(data => {
      if (data != null) {
        this.productservice.creatproductimages(
          this.coverimage == '../../../../../../assets/add.svg' ? null : this.coverimage,
          this.image1 == '../../../../../../assets/add.svg' ? null : this.image1,
          this.image2 == '../../../../../../assets/add.svg' ? null : this.image2,
          this.image3 == '../../../../../../assets/add.svg' ? null : this.image3,
          this.image4 == '../../../../../../assets/add.svg' ? null : this.image4, data["product_id"]).subscribe();
        this.attributes.forEach(x => {
          x.product_id = data["product_id"];
          if (x.quantity != null && x.sell_price != null)
            this.productservice.createproductdetails(x).subscribe(data => {
              if (data['product_id'] != null) {
               
                this.rest();
              }
            });
        });
        alert('Product Added');
      }
    });

  }
  selectecategory(event) {
    this.product.category_id = event.target.value;
  }


  private loadproducts() {
    this.productservice.read().subscribe(Data => {
      if (Data['records'] != null) {


        Data['records'].forEach(element => {
          this.allproducts.push(new Product(element['id'], element['product_name'], element['category_id'], element['purchase_price'], element['sell_price'], element['description'], element['vendor'], Configuration.imagesURL + element['image_url'], element['catergory'], element['instock'], element['discount'], element['create_date']));
        });



      }
    });
  }

  deleteproduct(id) {
    let index = this.allproducts.findIndex(d => d.id == id);
    if (index > -1) { this.allproducts.splice(index, 1); }
    this.productservice.deleteproduct(id).subscribe();
  }


  deletevareint(id) {
    let index = this.attributes_db.findIndex(d => d.id == id);
    if (index > -1) { this.attributes_db.splice(index, 1); }
    this.productservice.deletevarient(id).subscribe();
  }

  rest() {
    this.attributes = null;
    this.attributes = new Array<Productattributes>();
    this.product = null;
    this.product = new Product();
    this.coverimage = '../../../../../../assets/add.svg';
    this.image1 = '../../../../../../assets/add.svg';
    this.image2 = '../../../../../../assets/add.svg';
    this.image3 = '../../../../../../assets/add.svg';
    this.image4 = '../../../../../../assets/add.svg';
  }



  toggle(catId): void {

    if (catId == this.opendd) {
      this.opendd = -1;

      

      var element= document.getElementById('add_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;

    }
    else {
    this.opendd = catId;


      var element = document.getElementById('edit_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('add_' + catId);
      element.style.display = null;
    }
  }
  saveproduct(pro:Product){ 
    var temp:Productattributes[] = this.attributes_db.filter(x=>x.product_id == pro.id);
    this.productservice.updateproduct(pro).subscribe(data=>{
      
    });

    temp.forEach(element => {      
      this.productservice.updatevarient(element).subscribe();   
      });

   
  }

  getprodvar(prod_id){
    return this.attributes_db.filter(x=>x.product_id == prod_id);
  }

  getcategory(id){ 
    return this.catitems.find(x=>x.id == id).category;
  }

}
