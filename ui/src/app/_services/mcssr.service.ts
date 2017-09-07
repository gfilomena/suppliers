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
   let splitted = mc.uri.split("."); 
   extension = splitted[splitted.length-1];

   let name = mc.uri.split("/"); 
   filename = name[name.length-1];
   mimeType = mc.type+"/"+extension;

 

   //console.log('uri:',splitted)
   //console.log('uri-length:',splitted.length)
   console.log('extensionh:',extension)
   switch(mc.type) { 
    case 'video': { 
        mimeType = "video/mp4"
       
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
            
            //mc.uri = "https://ia800304.us.archive.org/18/items/CR7_Skills_Vs_AC_Milan/CR7_Skills_Vs_AC_Milan.mp4";

            let params = '{ '
            +' "user":"salsx", '
            +' "params" : {' 
            +' "path":"/Producer_Repository/workspaces/'+mc.type+'", '
            +' "url":"'+ mc.uri +'", '
            +' "encoding":"UTF-8", '
            +' "fileName":"'+filename+'", '
            +' "mimeType":"'+mimeType+'", '
            if(mc.metadata) {
                params +=    ' "tags":"'+ mc.metadata +'", ';
            }else{
                params +=    ' "tags":"", ';
            }
                params +=' "type":"File"'
            +'}}';

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