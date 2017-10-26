import { UserRepository } from './../_models/user-repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/index';


@Injectable()
export class UserRepositoryService {
    constructor(private http: Http, private auth: AuthService) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/registration", this.auth.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/registration/" + id, this.auth.jwt()).map((response: Response) => response.json())
    }

    create(userRepository: UserRepository) {
        return this.http.post(environment.serviceUrl + "/registration", userRepository, this.auth.jwt())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + "/registration/me/", this.auth.jwt()).map((response: Response) => response.json())
    }

    update(userRepository: UserRepository) {
        return this.http.put(environment.serviceUrl + "/registration/" + userRepository.id ,userRepository, this.auth.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/registration/" + id, this.auth.jwt())
    }
}