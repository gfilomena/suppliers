export class Repository {
    id: string;
    name: string
    uri: string
    urlPrefix: string

    constructor(name:string = '', uri:string= '', urlPrefix:string= ''){
        this.name = name;
        this.uri = uri;
        this.urlPrefix = urlPrefix;
    }

}
