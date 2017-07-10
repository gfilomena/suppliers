export class Repository {
    name: string
    uri: string
    urlPrefix: string

    constructor(name:string, uri:string, urlPrefix:string){
        this.name = name;
        this.uri = uri;
        this.urlPrefix = urlPrefix;
    }
}
