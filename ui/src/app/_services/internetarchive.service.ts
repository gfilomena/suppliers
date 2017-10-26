import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { MultimediaContent } from './../_models/multimediaContent';
import { mediafile } from './../_models/mediafile';
import { AuthService } from '../_services/index';

@Injectable()
export class InternetArchiveService {

constructor(private http: Http, private auth: AuthService) { }

listfiles:mediafile[];

getDetails(url:string) {

    return this.http.get(url)
    .map((response: Response) => response.json())

}

}
