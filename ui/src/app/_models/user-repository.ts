export class UserRepository {
    id: string
    user: string
    repository:string
    username: string
    password: string
    apiKey: string
    token: string
    enabled: boolean

    constructor(
        user:string = '',
        repository:string = '',
        username:string= '',
        password:string= '',
        apiKey:string= '',
        token:string= '',
        enabled:boolean = true){
            
        this.user = user;
        this.repository = repository;
        this.username = username;
        this.password = password;
        this.apiKey = apiKey;
        this.token = token;
        this.enabled = enabled;
    }

}
