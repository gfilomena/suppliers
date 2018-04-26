import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MultimediaContent } from '../_models/multimediaContent';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import * as mime from 'mime-types';


@Injectable()
export class McssrService {

    constructor(private http: Http) { }


    create(mc: MultimediaContent) {
        return this.http.post(environment.serviceUrl + '/mcssr', this.getParam(mc), this.jwt())
    }

    updateTags(mc: MultimediaContent, uid: String) {
        return this.http.post(environment.serviceUrl + '/mcssr/tag', this.getParamTags(mc,uid), this.jwt())
    }

    getParam(mc: MultimediaContent): JSON {

        let mimeType: String;
        let type: String;
        let folder: String;
        let charset: String;
        let licenseType: String | null | undefined;
        let metadata: String | null | undefined;
        let description: String | null | undefined;

        mc.licenseType = 'freeware';
        licenseType = mc.licenseType || '';
        description = mc.description.substring(0, 2000) || '';
        metadata = mc.metadata ? mc.metadata.join() : '';

        if (!mc.fileExtension) {
            mimeType = mime.lookup(mc.downloadURI);
        } else {
            mimeType = mc.fileExtension;
        }

        console.log('mcssrService-mimeType', mimeType);
        // charset = mime.charset(mimeType) // 'UTF-8'
        // console.log('charset:',charset)
        charset = 'UTF-8';
        console.log('mimeType:', mimeType);




        switch (mc.type) {
            case 'video': {
                folder = 'Video';
                type = 'Video';
                break;
            }
            case 'audio': {
                folder = 'Audio';
                type = 'Audio';
                break;
            }
            case 'image': {
                folder = 'Image';
                type = 'Picture';
                break;
            }
            case 'text': {
                folder = 'Text';
                type = 'File';
                mimeType = 'text/html';
                break;
            }
            default: {
                break;
            }
        }
//type= 'WebTemplateSource';


        const params: string = '{ '
            + ' "params" : {'
            + ' "type":"' + type + '", '
            + ' "name":"' + this.clean(mc.name) + '", '
            + ' "properties" : {'
            + ' "dc:title":"' + this.clean(mc.name) + '", '
            + ' "dc:description":"' + this.clean(description) + '", '
            + ' "dc:source":"' + mc.source.name + '", '
            + ' "mul:url":"' + mc.downloadURI + '", '
            + ' "mul:encoding":"' + charset + '", '
            + ' "mul:mime-type":"' + mimeType + '", '
            + ' "mul:License" : {'
            + ' "name":"' + licenseType + '", '
            + ' "type":"' + licenseType + '", '
            + ' "version": "1", '
            + ' "url":"http://licenseurl.org" '
            +'}'
            +'}'
            +'},'
            + ' "input":"/Producer_Repository/workspaces/' + folder + '", '
            +'"context": {}'
            + '}';

        console.log('to Nuxeo:' , params);

        const obj = JSON.parse(params);

        return obj;
    }

    getParamTags(mc: MultimediaContent, uid: String): JSON {
        
        let metadata: String | null | undefined;
        
        metadata = mc.metadata ? mc.metadata.join() : '';        
        
                const params: string = '{ '
                    + ' "params" : {'
                    + ' "tags":"' + metadata + '" '
                    +'},'
                    + ' "input":"' + uid + '", '
                    +'"context": {}'
                    + '}';
        
                console.log('to Nuxeo:' , params);
        
                const obj = JSON.parse(params);
        
                return obj;
            }
    // private helper methods

    private jwt() {
        const access_token = localStorage.getItem('id_token');
        if (access_token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
            return new RequestOptions({ headers: headers });
        }
        return null;
    }

    private clean(item: String): String {
        return item.replace(/\"/g, '');
    }





}