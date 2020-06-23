import { Component, OnInit} from '@angular/core';

export class Images {
  constructor(private _id: string,   
    private _imageurl:string= "") { }

  get quote_id(): string {
    return this._id;
  }
  set quote_id(value: string) {
    this._id = value;
  }
  get imageurl(): string {
    return this._imageurl;
  }
  set imageurl(value: string) {
    this._imageurl = value;
  }
}


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  
})
export class SliderComponent implements OnInit {

public imgsource :string ;
images = new Array<Images>(); 

  constructor( ) {
    
    
    this.images.push(
      new Images("1","../../../../assets/sliderimages/1.jpg"),
      
      new Images("2","../../../../assets/sliderimages/2.jpg"),
      
      new Images("3","../../../../assets/sliderimages/3.jpg"),
      
      new Images("4","../../../../assets/sliderimages/4.jpg"),
      
      new Images("5","../../../../assets/sliderimages/5.jpg"),
      
      new Images("6","../../../../assets/sliderimages/6.jpg"),
      
      new Images("7","../../../../assets/sliderimages/7.jpg"),
      
      new Images("8","../../../../assets/sliderimages/8.jpg"),
      
      new Images("9","../../../../assets/sliderimages/9.jpg"),
      
      new Images("10","../../../../assets/sliderimages/10.jpg"),
      
      new Images("11","../../../../assets/sliderimages/11.jpg"),
      
      new Images("12","../../../../assets/sliderimages/12.jpg"),
      
      new Images("13","../../../../assets/sliderimages/13.jpg"),
      
      new Images("14","../../../../assets/sliderimages/14.jpg"),
      
      new Images("15","../../../../assets/sliderimages/15.jpg"),
      
      new Images("16","../../../../assets/sliderimages/16.jpg"),
      
      new Images("17","../../../../assets/sliderimages/17.jpg"),
      
      new Images("18","../../../../assets/sliderimages/18.jpg"),
      
      new Images("19","../../../../assets/sliderimages/19.jpg"));
  
  }

  ngOnInit() {}

 
  
  
 
}
