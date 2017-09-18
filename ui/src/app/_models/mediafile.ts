 export class File {
            name: string;
            source: string;
            mtime: string;
            size: string;
            md5: string;
            crc32: string;
            sha1: string;
            format: string;
            length: string;
            height: string;
            width: string;
            original: string;
            btih: string;
}
    
export class Metadata {
            identifier: string;
            mediatype: string;
            collection: string;
            description: string;
            scanner: string;
            subject: string;
            title: string;
            publicdate: string;
            uploader: string;
            addeddate: string;
            curation: string;
}
    
export class Review {
            reviewbody: string;
            reviewtitle: string;
            reviewer: string;
            reviewdate: string;
            createdate: string;
            stars: string;
}
    
export class mediafile {
            created: number;
            d1: string;
            d2: string;
            dir: string;
            files: File[];
            files_count: number;
            item_size: number;
            metadata: Metadata;
            reviews: Review[];
            server: string;
            uniq: number;
            updated: number;
            workable_servers: string[];



            constructor( created: number){
                this.created = created;
            }
}
    
 
    
    