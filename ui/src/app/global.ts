// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  roles: string[] = ['USER'];
  user: string = '';
}