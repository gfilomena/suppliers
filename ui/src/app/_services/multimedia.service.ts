import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { AppConfig } from "../app.config"
import { MultimediaContent } from "../_models/multimediaContent"

@Injectable()
export class UserService {
constructor(private http: Http, private config: AppConfig) { }

}