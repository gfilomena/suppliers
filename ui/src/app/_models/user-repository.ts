export class UserRepository {
    id: string
    user: string
    repositoryId:string
    repositoryName:string
    username: string
    password: string
    apiKey: string
    token: string
    enabled: boolean

    constructor(
        user:string = '',
        repositoryId:string = '',
        repositoryName:string = '',
        username:string= '',
        password:string= '',
        apiKey:string= '',
        token:string= '',
        enabled:boolean = true){
            
        this.user = user;
        this.repositoryId = repositoryId;
        this.repositoryName = repositoryName;
        this.username = username;
        this.password = password;
        this.apiKey = apiKey;
        this.token = token;
        this.enabled = enabled;
    }

}
