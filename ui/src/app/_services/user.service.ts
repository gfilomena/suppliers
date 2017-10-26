import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { AuthService } from '../_services/index';

@Injectable()
export class UserService {
    constructor(private http: Http, private auth: AuthService) { }

    getAll() {
        return this.http.get(environment.serviceUrl + '/users', this.auth.jwt()).map((response: Response) => response.json())
    }

    getById(id: string) {
        return this.http.get(environment.serviceUrl + '/users/' + id, this.auth.jwt()).map((response: Response) => response.json())
    }

    create(user: User) {
        return this.http.post(environment.serviceUrl + '/users/register', user, this.auth.jwt())
    }

    update(user: User) {
        return this.http.put(environment.serviceUrl + '/users/' + user.id, user, this.auth.jwt())
    }

    delete(username: string) {
        return this.http.delete(environment.serviceUrl + '/users/' + username, this.auth.jwt());
    }
}
