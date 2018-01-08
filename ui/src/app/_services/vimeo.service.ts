
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class VimeoService {
    constructor(private http: Http) { }

    client_id = '175fc3ce932c67890f60588b6377fbe91ca49e47';
    client_secret = 'T7olulWMgGe0C73zPL63ALBckCsQ6ZoEreNcwoLcCPU0HyQjFEiEtLhvE2pi9iqpNFwjRwr7+wZGiT1QtoBIHBBoqHe/LevVt1PByXZYiOydM5CzmSkmkRMu+MWIcb1o';




    getToken(code: string) {
        console.log(code);
        var body = JSON.stringify(
            {"grant_type":"authorization_code",
             "redirect_uri":"http://localhost:4200/profile",
             "code": code });
             console.log('body',body);
        let headers = new Headers();
         headers.append("Content-Type", "application/json");
         headers.append("Authorization", "Basic " + btoa(this.client_id + ':' + this.client_secret));
        //headers.append("Authorization","Basic MTc1ZmMzY2U5MzJjNjc4OTBmNjA1ODhiNjM3N2ZiZTkxY2E0OWU0NzpUN29sdWxXTWdHZTBDNzN6UEw2M0FMQmNrQ3NRNlpvRXJlTmN3b0xjQ1BVMEh5UWpGRWlFdExodkUycGk5aXFwTkZ3alJ3cjcrd1pHaVQxUXRvQklIQkJvcUhlL0xldlZ0MVBCeVhaWWlPeWRNNUN6bVNrbWtSTXUrTVdJY2Ixbw==");

        //headers.append("Access-Control-Allow-Origin", "*");
        console.log('headers',headers);

        let options = new RequestOptions({ headers: headers });
       return this.http.post('https://api.vimeo.com/oauth/access_token', body, options);
     }




}