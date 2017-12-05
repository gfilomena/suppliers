export class MultimediaContent {
    type: string;
    fileExtension: string;
    length: string;
    metadata: string[]
    name: string;
    description: string;
    thumbnail: string;
    downloadURI: string;
    source: {
        name: string;
        urlPrefix: string;
    }
    uri: string;
    licenseType: string;
    date: string;
    bookmark: boolean;
}
