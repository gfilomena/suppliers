import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { MultimediaContent } from "../_models/multimediaContent"
import { User } from "../_models/user";
import { environment } from '../../environments/environment';
import * as mime from 'mime-types';


@Injectable()
export class McssrService {

constructor(private http: Http) {
    
 }
url = "http://localhost:8080/nuxeo/site/automation/Document.DownloadMultimediaContent"

create(mc: MultimediaContent) {
    return this.http.post(environment.serviceUrl + "/mcssr", this.getParam(mc),this.jwt())
}

getParam(mc: MultimediaContent): JSON {

   let mimeType : String;
   let filename : String;
   let type : String;
   let folder: String;
   let charset: String;

mimeType = mime.lookup(mc.uri) 
//charset = mime.charset(mimeType) // 'UTF-8'
//console.log('charset:',charset)
charset = 'UTF-8';
console.log('mimeType:',mimeType)



   
   switch(mc.type) { 
    case 'video': {
        folder = "Video"
        type = "Video"
        break;
    } 
    case 'audio': { 
        folder = "Audio"
        type = "Audio"
       break;
    } 
    case 'image': { 
        folder = "Image"
        type = "Picture"
       break;
    } 
    case 'text': { 
        folder = "Text"
        type = "File"
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
            +' "path":"/Producer_Repository/workspaces/'+folder+'", '
            +' "url":"'+ mc.uri +'", '
            +' "encoding":"'+charset+'", '
            +' "fileName":"'+mc.name+'", '
            +' "mimeType":"'+mimeType+'", '
            
            if(mc.metadata) {
                params +=    ' "tags":"'+ mc.metadata +'", ';
            }else{
                params +=    ' "tags":"", ';
            }
                params +=' "type":"'+type+'" '
                params +='}}';

        console.log("to Nuxeo:",params)

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