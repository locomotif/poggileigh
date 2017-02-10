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

    getMessage(itemId: string): string {
        let index = this.eleRef.indexOf(itemId);
        if ( index !== -1 ) {
            return typeof this.data[index].message == "undefined" ? "" :  this.data[index].message;
        } else {
            throw new Error("itemId: " + itemId + " doesn't exist");
        }
    }

    getEventTypes(): string[] {
        let filter = (item, acc) => item.reduce(((accumulator, currentValue, currentIndex, arr) => {
            if(accumulator.indexOf(currentValue['eventType']) < 0) {
                accumulator.push(currentValue['eventType']);
            }
            return accumulator;
        }), acc);
        return filter(this.data, []);
    }

    //@todo make a type for this
    getRectDim(itemId: string): any {
        let index = this.eleRef.indexOf(itemId);
        if ( index !== -1 ) {
            return this.data[index].rect ? this.data[index].rect : {width: 400, height: 200 };
        } else {
            throw new Error("itemId: " + itemId + " doesn't exist");
        }
    }

    /**
     * getStartDates can filter: education and work experience
     * @param string[] select [education, experience]
     * @return Date[]
     */
    getStartDates(select?: string[]): Date[] {
        select = select || [];
        let filter = (item, acc) => item.reduce(((accumulator, currentValue, currentIndex, arr) => {

            // Currently dates need to be unique. I haven't dealt with the edge
            // condition where I would have overlapping dates. If date is
            // already in array do not include the object
            if (
                accumulator[accumulator.length-1] != currentValue['start']
                &&
                (select.length === 0 || select.indexOf(currentValue['eventType']) !== -1)
            ) {
                accumulator.push({
                    id: this.eleRef[currentIndex], 
                    date: currentValue['start'],
                    eventType: currentValue['eventType']
                });
            }
            return accumulator;
        }), acc);

        return filter(this.data, []);
    }

    length(): number {
        return this.data.length;
    }
}

export const eventTypeColor = {
    introduction: 'myWhite',
    projects: "myOrange",
    experience: 'myBlue',
    education: 'myGreen',
}

