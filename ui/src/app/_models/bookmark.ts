import { MultimediaContent } from './MultimediaContent';

export class Bookmark {
    id:string;
    user:string;
    multimediaContent:MultimediaContent;

    constructor(user:string, multimediaContent:MultimediaContent){
        this.user = user;
        this.multimediaContent = multimediaContent;
    }
    
    
}
