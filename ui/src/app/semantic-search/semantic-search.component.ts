import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SemanticService } from './semantic.service';

@Component({
  selector: 'semantic-search',
  templateUrl: './semantic-search.component.html',
  styleUrls: ['./semantic-search.component.css']
})

export class SemanticSearchComponent {

  // obj that defines the form structure
  form: FormGroup;

  constructor(fb: FormBuilder,
              private semanticService: SemanticService) {
    this.form = fb.group({
      'url': [""]
    });
  }

  onSubmit(value: object): void {
    console.log("Url received:", value['url']);

    this.semanticService.searchUrlAnnotations(value)
      .subscribe(res => {
          let annotations: object = res.json();
          console.log(annotations);
        },
        error => {
          console.log('Semantic Search error:', error);
        });
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
