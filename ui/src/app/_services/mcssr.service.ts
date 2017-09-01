import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { MultimediaContent } from "../_models/multimediaContent"

@Injectable()
export class McssrService {
constructor(private http: Http) { }
url = "http://localhost:8080/nuxeo/site/automation/Document.DownloadMultimediaContent"

create(mc: MultimediaContent) {
    return this.http.post(this.url, this.getParam(mc),this.jwt())
}

getParam(mc: MultimediaContent): String {

   let mimeType : String;

    switch(mc.type) { 
        case 'video': { 
          
           
            break;
        } 
        case 'audio': { 
           
          
           break;
        } 
        case 'image': { 
            mimeType = "image/jpg"
         
           break;
        } 
        case 'text': { 
            mimeType = "text/html"
         
           break;
        } 
        default: { 
          break;
        } 
      } 

    var params = '{ "params" : {' 
    +' "path":"/default-domain", '
    +' "url":"'+ mc.uri +'", '
    +' "fileName":"'+ mc.name +'", '
    +' "mimeType":"'+ mimeType +'", '
    +' "tags":"'+ mc.metadata +'", '
    +' "type":"File"'
    +'}}';
console.log("params",params)
    return params;
}

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        //let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        //if (currentUser && currentUser.token) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json,application/x-www-form-urlencoded');
            headers.append('Authorization', 'Basic ' + btoa('Administrator:Administrator')); 
            headers.append('allowOrigin', '*');
            //headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
           // headers.append('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
            return new RequestOptions({ headers: headers })
        //}
        
    }


}