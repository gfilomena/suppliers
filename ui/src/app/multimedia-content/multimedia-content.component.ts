import { Component, OnInit, Input } from '@angular/core';
import {MultimediaContent} from '../_models/multimediaContent';
import { DomSanitizer } from '@angular/platform-browser';
import {MdDialog} from '@angular/material';


declare var $:any;

@Component({
  selector: 'app-multimedia-content',
  inputs: ['multimediaContent'],
  templateUrl: './multimedia-content.component.html',
  styleUrls: ['./multimedia-content.component.css']
})

export class MultimediaContentComponent {

  multimediaContent: MultimediaContent;


  constructor(public sanitizer: DomSanitizer) { 

  }

}


