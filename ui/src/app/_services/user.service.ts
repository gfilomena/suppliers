import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { User } from "../_models/user"

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/users", this.jwt()).map((response: Response) => response.json())
    }

    getById(id: string) {
        return this.http.get(environment.serviceUrl + "/users/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(user: User) {
        return this.http.post(environment.serviceUrl + "/users/register", user, this.jwt())
    }

    update(user: User) {
        return this.http.put(environment.serviceUrl + "/users/" + user.id, user, this.jwt())
    }

    delete(username: string) {
        return this.http.delete(environment.serviceUrl + "/users/" + username, this.jwt())
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