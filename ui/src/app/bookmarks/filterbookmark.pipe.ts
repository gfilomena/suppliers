import { Filter } from '../_models/filter';
import { MultimediaContent } from '../_models/multimediaContent';
import { Bookmark } from '../_models/bookmark';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterbookmark',
    pure: false
})


export class FilterBookmarkPipe implements PipeTransform {

    transform(items: Bookmark[], activeType: Filter[], activeRepositories: Filter[]): Bookmark[] {
        return items.filter(item => activeType.findIndex(obj => obj.name === item.multimediaContent.type && obj.enabled === true) !== -1)
                    .filter(item2 => activeRepositories.findIndex(obj => obj.name === item2.multimediaContent.source.name && obj.enabled === true) !== -1);

    }
}