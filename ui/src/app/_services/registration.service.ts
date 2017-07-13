import { UserRepository } from './../_models/user-repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { AppConfig } from "../app.config"


@Injectable()
export class UserRepositoryService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + "/registration", this.jwt()).map((response: Response) => response.json())
    }

    getById(id: string) {
        return this.http.get(this.config.apiUrl + "/registration/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(userRepository: UserRepository) {
        return this.http.post(this.config.apiUrl + "/registration", userRepository, this.jwt())
    }

    update(userRepository: UserRepository) {
        return this.http.put(this.config.apiUrl + "/registration/" + userRepository.id ,userRepository, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(this.config.apiUrl + "/registration/" + id, this.jwt())
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