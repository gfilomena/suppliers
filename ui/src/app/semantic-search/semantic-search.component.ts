import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SemanticService } from './semantic.service';

@Component({
  selector: 'semantic-search',
  templateUrl: './semantic-search.component.html',
  styleUrls: ['./semantic-search.component.css']
})

export class SemanticSearchComponent {

  // obj that defines the form structure
  private form: FormGroup;

  // annotations ordered by estimated importance
  private _orderedAnnotations: string[];
  private _annotationsTypes: string[];

  // maximum number of annotations we want to display
  // should be at least bigger than the expected number of returned annotation types
  private _max: number = 10;

  // file to be analysed by GATE
  private _file: File;

  // error message displayed by the form
  private _error: string;

  // tells the parent search-form component what annotation to put in the search form
  @Output()
  onAnnotationClicked: EventEmitter<string> = new EventEmitter<string>();

  // emitters used to toggle the progressbar
  @Output()
  onGATESubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output()
  onGATEResponse: EventEmitter<null> = new EventEmitter<null>();


  constructor(fb: FormBuilder,
              private semanticService: SemanticService) {

    this._orderedAnnotations = [];

    // default form
    this.form = fb.group({
      'url': [""]
    });

  }

  // create the annotation array ordered by estimated importance
  private indexAnnotations(annotations: Object): void {

    // array of types of retrieved annotations
    let types: string[] = Object.keys(annotations);

    // initialise the annotations categories array used to color the annotation chips
    this._annotationsTypes = [];

    // used to exit the loop if we cannot find any other annotation
    let l: number = -1;

    for (let i = 0  ; this._orderedAnnotations.length < this._max && this._orderedAnnotations.length !== l ; i++)  {
      l = this._orderedAnnotations.length;
      for (let t of types) { // take the i-th annotation if it occurs more than once
        let annotation: string = annotations[t][i];
        if (annotation && annotation['occurrences'] > 1 && this._orderedAnnotations.length <= this._max) {
          this._annotationsTypes.push(t.toLowerCase());
          this._orderedAnnotations.push(annotation['content']);
        }
      }
    }

  }

  // submit the url in the input field of the form of the uploaded file to the GATE api
  protected onSubmit(value: Object): void {

    this._error = "";

    this._orderedAnnotations = [];

    if (value['url']) { // url has precedence over file

      this._file = null;

      this.semanticService.searchUrlAnnotations(value)
        .subscribe(res => this.handleGATEResponse(res), err => this.handleGATEError(err))

    } else if (this._file) { // file case

      this.semanticService.searchFileAnnotations(this._file)
        .subscribe( res => this.handleGATEResponse(res), err => this.handleGATEError(err))

    } else {

      this._error = "No file nor URL specified";
      this.onGATEResponse.emit()

    }

  }

  // send the annotation to the parent search form
  protected searchForAnnotation(annotation: string): void {

    this.onAnnotationClicked.emit(annotation);

  }

  // a file has been uploaded
  protected onFileSelect($event: File[]): void {

    if ($event === null)
      this._error = "File type not accepted";
    else {
      this._error = null;
      this._file = $event[0] || this._file;
      console.log("file: " + this._file);
    }

  }

  // callback function to handle the annotations received
  private handleGATEResponse(res: any) {

    let annotations: Object = res.json();
    this.indexAnnotations(annotations);
    this.onGATEResponse.emit();

  }

  // callback function to handle internal server GATE errors
  private handleGATEError(error: any) {

    console.log('Semantic Search error:', error);
    this._error = "Server error";
    this.onGATEResponse.emit();

  }

  // delete uploaded file
  removeFile(): void {

    console.log("Deleting file");
    this._file = null;
    console.log("File: " + this._file);

  }

}
