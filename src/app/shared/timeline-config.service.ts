import { Injectable } from '@angular/core';

import { resumeConfig, TimelineEvent } from './index';

@Injectable()
export class TimelineConfigService {

    constructor() { }

    getResumeConfig(): TimelineEvent[] {
        return resumeConfig;
    }

    getMessage(index: number): string {
        return typeof resumeConfig[index].message == "undefined" ? "" :  resumeConfig[index].message;
    }

    //@todo make a type for this
    getRectDim(index: number): any {
        return resumeConfig[index].rect ? resumeConfig[index].rect : {width: 400, height: 200 };
    }

    getAllDates(): Date[] {
        //note: that the resume config file has entries that are in
        //chronological order; otherwise we would need to code a sorter
        let flatten = (item, acc) => item.reduce(((accumulator, currentValue, currentIndex, arr) => {
            // If date is already in array do not add
            /*
            if (accumulator[accumulator.length-1] != currentValue.start) {
                accumulator.push(currentValue.start);
            }
            */
            if (accumulator[accumulator.length-1] != currentValue.end) {
                accumulator.push(currentValue.end);
            }
            return accumulator;
        }), acc);

        let range: Date[] = flatten(resumeConfig, []);
        return range.sort((a,b) => a.getTime() > b.getTime() ? 1 : -1); 
    }

    length(): number {
        return resumeConfig.length;
    }
}
