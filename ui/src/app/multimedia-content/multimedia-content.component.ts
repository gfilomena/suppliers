import { Component, OnInit, Input } from '@angular/core';
import {MultimediaContent} from '../_models/multimediaContent';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-multimedia-content',
  inputs: ['multimediaContent', 'modalId'],
  templateUrl: './multimedia-content.component.html',
  styleUrls: ['./multimedia-content.component.css']
})

export class MultimediaContentComponent implements OnInit {

  multimediaContent: MultimediaContent;
  modalId: string;

  constructor(public sanitizer: DomSanitizer) { 

  }

  ngOnInit() {
    console.log('Modal ID: '+this.modalId);
  }

  getDate(date:string): string{
    return new Date(date).toString().slice(0,15);
  }

  openDetailModal(){
      console.log('Opening detail modal with id:'+this.getDetailModalId(this.multimediaContent.uri));
      $('#'+this.getDetailModalId(this.multimediaContent.uri)).appendTo("body").modal('show');
      console.log('Opened detail modal with id:'+this.getDetailModalId(this.multimediaContent.uri));
  }

  closeDetailModal =()=>{
    console.log('Closing detail modal with id:'+this.getDetailModalId(this.multimediaContent.uri));
      $('#'+this.getDetailModalId(this.multimediaContent.uri)).modal('toggle');
      console.log('Closed detail modal with id:'+this.getDetailModalId(this.multimediaContent.uri));
  }

  getDetailModalId(id:string){
    var s=id.replace(/\//g, ''); // remove slashes 
    console.log('created modal with id: '+s);
    return s;
  }

  getTargetDetailModalId(id:string){
    var s=id.replace(/\//g, ''); // remove slashes 
    console.log('created modal with id: '+s);
    return '#'+s;
  }

  getModalId(){
    return this.modalId;
  }
}
