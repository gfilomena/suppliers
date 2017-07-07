export class Repository {
    name: string
    uri: string
    prefix: string

    constructor(name:string, uri:string, prefix:string){
        this.name = name;
        this.uri = uri;
        this.prefix = prefix;
    }
}
