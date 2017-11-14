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
  private orderedAnnotations: string[];

  // maximum number of annotations we want to display
  // should be at least bigger than the expected number of returned annotation types
  private max = 10;

  // tells the parent search-form component what annotation to put in the search form
  @Output()
  onAnnotationClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(fb: FormBuilder,
              private semanticService: SemanticService) {

    this.orderedAnnotations = [];

    // default form
    this.form = fb.group({
      'url': [""]
    });

  }


  // create the annotation array ordered by estimated importance
  private indexAnnotations(annotations: Object): void {

    // array of types of retrieved annotations
    let types: string[] = Object.keys(annotations);

    // variable used to exit the loop in case we cannot find any other annotation
    let l: number = -1;

    for (let i = 0; this.orderedAnnotations.length < this.max && this.orderedAnnotations.length !== l ; i++)  {
      l = this.orderedAnnotations.length;
      console.log('types:' + types);
      for (let t of types) { // take the i-th annotation if it occurs more than once
        console.log('t:' + t);
        console.log(annotations[t]);
        let annotation: string = annotations[t][i];
        if (annotation && annotation['occurrences'] > 1 && this.orderedAnnotations.length <= this.max) {
          this.orderedAnnotations.push(annotation['content']);
        }
      }
    }

    console.log('First 10 annotations: ' + this.orderedAnnotations);
  }


  // submit the url in the input field of the form to the GATE api
  protected onSubmit(value: Object): void {

    this.orderedAnnotations = [];
    console.log("Url received:", value['url']);

    this.semanticService.searchUrlAnnotations(value)
      .subscribe(res => {
          let annotations: Object = res.json();
          console.log(annotations);
          this.indexAnnotations(annotations);
        },
        error => {
          console.log('Semantic Search error:', error);
        });
  }

  // send the annotation to the parent search form
  protected searchForAnnotation(annotation: string): void {

    this.onAnnotationClicked.emit(annotation);

  }


  /*
  // Retrieve the uploaded file
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);

      // REST call
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let body = new Body;
      body
      let options = new RequestOptions({ headers: headers });

    }
  }
  */

}
