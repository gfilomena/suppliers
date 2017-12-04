import { MultimediaContent } from './multimediaContent';
export class SearchResult {

    id: string;
    keyWords: string[];
    freeText: string;
    semanticSearch: string;
    date: Date;
    multimediaContents: MultimediaContent[];
    inDate: Date;
    endDate: Date;
    types: string[];
    nOfResults: number;
    checked: boolean;

}
