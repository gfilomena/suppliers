import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { MultimediaContent } from './../_models/multimediaContent';
import { mediafile } from './../_models/mediafile';

@Injectable()
export class InternetArchiveService {

constructor(private http: Http) { }

listfiles:mediafile[];

getDetails(url:string) {

  let headers = new Headers({ "Content-Type": "application/json" })  
      //headers.append('Content-Type', 'application/x-www-form-urlencoded');
  let options = new RequestOptions()

    return this.http.get(url, options)
    .map((response: Response) => response.json())

}

mapResponse(data){

   let created = data.created;
   let server = data.server;
   let dir = data.dir;
   let description = data.metadata.description;
   let name = data.metadata.title;
   let metadata:string[] = data.metadata.subject.split(";");
   let licenseType = data.metadata.licenseurl;
   let i:number;



   for(i=0; i < data.files.length; i++){
       
      let mc:MultimediaContent;
      mc.date = created;
      mc.description = description;
      mc.name = name;
      mc.metadata = metadata;
      mc.licenseType = licenseType;
      mc.downloadUri = server + dir + "/" + data.files[i].name;
      mc.fileExtension = data.files[i].format;
   }
   

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
