import { UserRepository } from './../_models/user-repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class UserRepositoryService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/registration", this.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/registration/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(userRepository: UserRepository) {
        return this.http.post(environment.serviceUrl + "/registration", userRepository, this.jwt())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + "/registration/me/", this.jwt()).map((response: Response) => response.json())
    }

    update(userRepository: UserRepository) {
        return this.http.put(environment.serviceUrl + "/registration/" + userRepository.id ,userRepository, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/registration/" + id, this.jwt())
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