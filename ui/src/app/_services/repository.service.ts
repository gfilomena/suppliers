import { Repository } from './../_models/repository';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class RepositoryService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/repository", this.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/repository/" + id, this.jwt()).map((response: Response) => response.json())
    }

    create(repository: Repository) {
        return this.http.post(environment.serviceUrl + "/repository", repository, this.jwt())
    }

    update(repository: Repository) {
        return this.http.put(environment.serviceUrl + "/repository/" + repository.id ,repository, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/repository/" + id, this.jwt())
    }

    findRepositoriesByUser() {
        return this.http.get(environment.serviceUrl + "/repository/me/", this.jwt()).map((response: Response) => response.json())
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