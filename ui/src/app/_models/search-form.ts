export class SearchForm {

    id: string
    freeText: string
    semanticSearch: string
    source: string

    constructor( freeText: string, semanticSearch: string, source: string){
        this.freeText=freeText;
        this.semanticSearch=semanticSearch;
        this.source=source;
    }
}