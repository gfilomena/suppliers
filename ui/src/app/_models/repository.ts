export class Repository {
    id: string;
    name: string
    URI: string
    urlPrefix: string

    constructor(name:string = '', URI:string= '', urlPrefix:string= ''){
        this.name = name;
        this.URI = URI;
        this.urlPrefix = urlPrefix;
    }

}
