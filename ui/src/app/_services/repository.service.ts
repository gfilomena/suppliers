import { Repository } from './../_models/repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { AppConfig } from "../app.config"


@Injectable()
export class RepositoryService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + "/repository", this.jwt()).map((response: Response) => response.json())
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + "/repository/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(repository: Repository) {
        return this.http.post(this.config.apiUrl + "/repository", repository, this.jwt())
    }

    update(repository: Repository) {
        return this.http.put(this.config.apiUrl + "/repository/" + repository.id ,repository, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(this.config.apiUrl + "/repository/" + id, this.jwt())
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (currentUser && currentUser.token) {
            let headers = new Headers({ "Authorization": "Bearer " + currentUser.token })
            return new RequestOptions({ headers: headers })
        }
        return null
    }
}