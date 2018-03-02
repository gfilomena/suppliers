import { Repository } from './../_models/repository';
import { UserRepository } from './../_models/user-repository';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ValidatorService {


    repository: Repository;

    constructor(private http: Http) {

        this.repository = new Repository();
     }

    pexels(ur: UserRepository) {
        const headers = new Headers({ 'Authorization':  ur.apiKey });
        return this.http.get('http://api.pexels.com/v1/search?query=italy',
         new RequestOptions({ headers: headers })).map((response: Response) => response.status);
    }

    pixabay(ur: UserRepository) {
        return this.http.get('https://pixabay.com/api/?key=' + ur.apiKey + '&q=football&image_type=photo&per_page=5',
        new RequestOptions()).map((response: Response) => response.status);
    }

    youtube(ur: UserRepository) {
        return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + ur.apiKey ,
        new RequestOptions()).map((response: Response) => response.status);
    }

}