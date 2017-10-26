import { Repository } from './../_models/repository';
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/index';


@Injectable()
export class RepositoryService {
    constructor(private http: Http, private auth: AuthService) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/repository", this.auth.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/repository/" + id, this.auth.jwt()).map((response: Response) => response.json())
    }

    create(repository: Repository) {
        return this.http.post(environment.serviceUrl + "/repository", repository, this.auth.jwt())
    }

    update(repository: Repository) {
        return this.http.put(environment.serviceUrl + "/repository/" + repository.id ,repository, this.auth.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/repository/" + id, this.auth.jwt())
    }

    findRepositoriesByUser() {
        return this.http.get(environment.serviceUrl + "/repository/me/", this.auth.jwt()).map((response: Response) => response.json())
    }
}
