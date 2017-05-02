export class SearchForm {

    id: string
    keyWords: string
    freeText: string
    semanticSearch: string
    inDate: Date
    endDate: Date
    type: string
    source: string

    constructor( keyWords: string, freeText: string, semanticSearch: string, inDate: Date, endDate: Date, type: string, source: string){
        this.keyWords=keyWords;
        this.freeText=freeText;
        this.semanticSearch=semanticSearch;
        this.inDate=inDate;
        this.endDate=endDate;
        this.type=type;
        this.source=source;
    }
}