import { UserRepository } from './../_models/user-repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class UserRepositoryService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/registrations", this.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/registrations/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(userRepository: UserRepository) {
        return this.http.post(environment.serviceUrl + "/registrations", userRepository, this.jwt())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + "/registrations/me/", this.jwt()).map((response: Response) => response.json())
    }

    update(userRepository: UserRepository) {
        return this.http.put(environment.serviceUrl + "/registrations/" + userRepository.id ,userRepository, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/registrations/" + id, this.jwt())
    }

    // private helper methods

    private jwt() {
        const access_token = localStorage.getItem('id_token');
        if (access_token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
            return new RequestOptions({ headers: headers });
        }
        return null;
    }
}