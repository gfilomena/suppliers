export class SearchForm {

    id: string
    keyWords: string
    freeText: string
    semanticSearch: string
    inDate: Date
    endDate: Date
    source: string

    constructor( keyWords: string, freeText: string, semanticSearch: string, inDate: Date, endDate: Date, source: string){
        this.keyWords=keyWords;
        this.freeText=freeText;
        this.semanticSearch=semanticSearch;
        this.inDate=inDate;
        this.endDate=endDate;
        this.source=source;
    }
}