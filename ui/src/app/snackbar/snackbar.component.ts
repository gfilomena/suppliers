import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class Snackbar {

  /*
  @Input() message: string;
  @Input() action?: string;
  @Input() status: boolean;
  @Input() time?: number;
*/

  constructor(public snackBar: MatSnackBar) { }



  run(message: string, positiveresponse: boolean, action?: string, time?: number) {


    if (time == null) {
      time = 3000;
    }

    if (action == null) {
      if (positiveresponse) {
        action = 'Successful';
      } else {
        action = 'Error';
      }
    }

    let cssclasses;
    if (positiveresponse) {
      cssclasses = 'success-snackbar';
    } else {
      cssclasses = 'errorSnackBar';
    }
    console.log('cssclasses', cssclasses);

    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      extraClasses: [cssclasses]
    });
  }

}
