import { Injectable } from '@angular/core';

import { resumeConfig, TimelineEvent } from './index';

@Injectable()
export class TimelineConfigService {

    private data: any;
    private eleRef: string[] = [];

    constructor() {
        // sort resume data based on start date
        this.data = resumeConfig.sort((a,b) => a.start.getTime() > b.start.getTime() ? 1 : -1); 

        // create reference array
        this.data.forEach((e, i) => this.eleRef.push("_"+i));
    }

    getResumeConfig(): TimelineEvent[] {
        return this.data;
    }

    getMessage(index: number): string {
        return typeof this.data[index].message == "undefined" ? "" :  this.data[index].message;
    }

    //@todo make a type for this
    getRectDim(index: number): any {
        return this.data[index].rect ? this.data[index].rect : {width: 400, height: 200 };
    }

    getAllDates(select?: string): Date[] {
        select = select || "start";
        let filter = (item, acc) => item.reduce(((accumulator, currentValue, currentIndex, arr) => {
            let obj = {id: this.eleRef[currentIndex], date: currentValue[select]};

            // If date is already in array do not add
            if (accumulator[accumulator.length-1] != currentValue[select]) {
                accumulator.push(obj);
            }
            return accumulator;
        }), acc);

        return filter(this.data, []);
    }

    length(): number {
        return this.data.length;
    }
}
