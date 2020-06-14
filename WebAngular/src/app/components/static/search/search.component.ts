import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchevent = new EventEmitter<string>();
  
  @Input()
  searchstring :string = ""
  
  Landingpage: boolean = false;
  constructor(private router :Router) {
    if (this.router.url == "/landingpage" || this.router.url == '/') {
      this.Landingpage = true;
      console.log(this.Landingpage);

    }
    else {
      this.Landingpage = false;
    }
   }

  ngOnInit() {
  }

  sendMessage() {
    this.searchevent.emit(this.searchstring);
  }

}
