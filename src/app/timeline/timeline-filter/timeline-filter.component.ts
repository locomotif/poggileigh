/**
 * 
 */
import { 
    Component, 
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    NgClass
} from '@angular/common';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { TimelineConfigService, eventTypeColor } from '../../shared/index';
import * as RX from 'rxjs/Rx';

@Component({
    selector: 'app-timeline-filter',
    templateUrl: './timeline-filter.component.html',
    exportAs: 'filter',
    styleUrls: ['./timeline-filter.component.scss'],
    providers:[TimelineConfigService]
})
export class TimelineFilterComponent implements OnInit, OnChanges {

    private show: Boolean = false;
    private activeFilter: string[] = [];
    private checkboxState: any = {};
    private checkboxLabelColor: any = {};
    private options: string[];
    private labels: any = {
        introduction: 'Intro',
        projects: "Projects",
        experience: 'Work Experience',
        education: 'Education',
    }

    public filterGroup: FormGroup;
    @Output("filterTimeline") applyFilter: EventEmitter<string[]> = new EventEmitter<string[]>();

    @Input("myDefaultFilter") defaultFilter: string[];

    constructor(
        private config: TimelineConfigService
    ) { }

    ngOnInit() {
        let observer = {
            next: (x) => {this.updateTimeline(x) },
                error: (err) => console.log(err),
                complete: () => {console.log("complete notified");}
        };
        let group: any = {};
        this.options = this.config.getEventTypes();
        this.options.forEach((e, i) => {
            group[e] = new FormControl(false);

            /* check to see if the state has already been added by the default
             * state captured from parent component */
            if(!this.checkboxState[e]) {
                this.updateCheckboxState(e, false);
            }
        });
        this.filterGroup = new FormGroup(group);
        this.filterGroup.valueChanges
        .debounceTime(200)
        .subscribe(observer);
    }

    ngOnChanges() {
        if(this.activeFilter.length === 0) {
            for(let i in this.defaultFilter){
                this.activeFilter.push(this.defaultFilter[i]);
                this.updateCheckboxState(this.defaultFilter[i], true);
            }
        }
    }

    private toggleFilter(event): void {
        this.show = !this.show;
    }

    private updateTimeline(filter: any) {
        this.applyFilter.emit(this.activeFilter);
    }

    private toggleCheckbox(e, value) {
        e.stopPropagation();
        let c: any;

        for(let i in this.filterGroup.controls){
            if(i == value) {
                c = this.filterGroup.controls[i];
            }
        }
        if(this.checkboxState[value]) {
            this.removeFilter(value, c);
        } else {
            this.addFilter(value, c);
        }
    }

    private addFilter(item: string, c: any) {
        this.activeFilter.push(item);
        this.updateCheckboxState(item, true);
        c.setValue(true);
    }
    private removeFilter(item: string, c: any) {
        let index = this.activeFilter.indexOf(item);
        if(index >= 0) {
            this.activeFilter.splice(index, 1);
            this.updateCheckboxState(item, false);
            c.setValue(false);
        }
    }
    private updateCheckboxState(eventType: string, state: Boolean): void {
        this.checkboxState[eventType] = state;
        this.updateColorState();
    }

    private updateColorState(): void {
        let atleastone: Boolean = false;
        for(let i in this.checkboxState) {
            if(this.checkboxState[i])
                atleastone = true;
            this.checkboxLabelColor[i] = {};
            this.checkboxLabelColor[i][eventTypeColor[i]] = this.checkboxState[i];
        }

        // if all false then set all colors to true
        if(!atleastone){
            let makeTruthy = (o) => { let newO = {}; for(let i in o) if(typeof o[i] === "boolean") newO[i] = true; return newO; }
            for(let i in this.checkboxLabelColor) this.checkboxLabelColor[i] = makeTruthy(this.checkboxLabelColor[i]);
        }
    }
}
