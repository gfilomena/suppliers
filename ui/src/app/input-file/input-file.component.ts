import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  'moduleId': module.id,
  'selector': 'input-file',
  'templateUrl': './input-file.component.html'
})

export class InputFileComponent {

  @Input() accept: string;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  private _files: File[];

  onNativeInputFileSelect($event) {
    if (this.isDocument($event.srcElement.files[0])) {
      this._files = $event.srcElement.files;
      this.onFileSelect.emit(this._files);
    } else {
      this.onFileSelect.emit(null);
    }
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

  isDocument(file: File): boolean {

    let parts = file.name.split('.');
    let ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
    case 'txt':
    case 'doc':
    case 'docx':
    case 'html':
    case 'xml':
    case 'pdf':
    case 'sgml':
    case 'rtf':
    case 'eml':
    case 'ppt':
    case 'pptx':
      //etc
      return true;
    }
    return false;
  }

}
