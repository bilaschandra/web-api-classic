import {Component, OnInit, Input} from '@angular/core';
import {ModalService} from 'src/app/services/popup/modal.service';

@Component({
    selector:'app-imageviewer',
    templateUrl:'./imageviewer.component.html',
    styleUrls:['./imageviewer.component.scss']
})

export class ImageviewerComponent implements OnInit {

@Input() Id:string;    
@Input() ImageUrl : string;


    constructor(private modalService: ModalService){

    }
    ngOnInit(){
       console.log(this.ImageUrl)
    }
    openModal (Id:string){
      
        this.modalService.open(Id);
    }
    closeModal(Id:string){
        this.modalService.close(Id);
    }

    active:boolean=true;
    showImage:boolean=true;
    
}