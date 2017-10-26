import { Bookmark } from './../_models/bookmark';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { environment } from '../../environments/environment';
import { AuthService } from '../_services/index';


@Injectable()
export class BookmarkService {
    constructor(private http: Http, private auth: AuthService) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/bookmark", this.auth.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/bookmark/" + id, this.auth.jwt()).map((response: Response) => response.json())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + "/bookmark/me/", this.auth.jwt()).map((response: Response) => response.json())
    }

    create(bookmark: Bookmark) {
        return this.http.post(environment.serviceUrl + "/bookmark", bookmark, this.auth.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/bookmark/" + id, this.auth.jwt())
    }

    deleteAllByUser() {
        return this.http.delete(environment.serviceUrl + "/bookmark/me/", this.auth.jwt()).map((response: Response) => response)
    }

}