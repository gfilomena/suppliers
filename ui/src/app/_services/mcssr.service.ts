import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { MultimediaContent } from "../_models/multimediaContent"
import { User } from "../_models/user";
import { environment } from '../../environments/environment';
@Injectable()
export class McssrService {

constructor(private http: Http) { }
url = "http://localhost:8080/nuxeo/site/automation/Document.DownloadMultimediaContent"

create(mc: MultimediaContent) {
    return this.http.post(environment.serviceUrl + "/mcssr", this.getParam(mc),this.jwt())
}

getParam(mc: MultimediaContent): JSON {

   let mimeType : String;
   let extension : String;
   let filename : String;
   let type : String;
   let splitted = mc.fileExtension.split("/"); 
   extension = splitted[splitted.length-1];



   //console.log('uri:',splitted)
   //console.log('uri-length:',splitted.length)
   console.log('extensionh:',extension)
   switch(mc.type) { 
    case 'video': { 
        mimeType = "video/mp4"
        type = "Video"
        break;
    } 
    case 'audio': { 
        type = "Audio"
      
       break;
    } 
    case 'image': { 
        mimeType = "image/jpg"
        type = "Image"
       break;
    } 
    case 'text': { 
        mimeType = "text/html"
        type = "Text"
     
       break;
    } 
    default: { 
      break;
    } 
  } 
            
            //mc.uri = "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg";
            //mc.name = "pexels-photo-207962.jpeg";
            //mc.fileExtension = "image/jpeg"
            let params = '{ '
            +' "user":"salsx", '
            +' "params" : {' 
            +' "path":"/Producer_Repository/workspaces/'+type+'", '
            +' "url":"'+ mc.uri +'", '
            +' "encoding":"UTF-8", '
            +' "fileName":"'+mc.name+'.'+extension+'", '
            +' "mimeType":"'+mc.fileExtension+'", '
            if(mc.metadata) {
                params +=    ' "tags":"'+ mc.metadata +'", ';
            }else{
                params +=    ' "tags":"", ';
            }
            params +=' "type":"File" '
            params +='}}';

        console.log("params",params)

        let obj = JSON.parse(params);

    return obj;
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