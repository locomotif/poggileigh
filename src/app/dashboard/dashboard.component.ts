import { 
    Component, 
    OnInit, 
    OnDestroy,
    QueryList,
    ViewChildren,
} from '@angular/core';

import { dashboardConfig } from './dashboard.config';
import * as RX from 'rxjs/Rx';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

    private sections = dashboardConfig.sections;
    private imgLoaded: Boolean[] =[];
    private observable: any;

    constructor() {
        // preload images
        for(let i in this.sections) {
            this.imgLoaded.push(false);
            if(this.sections[i].hasOwnProperty('img')) {
                let image = new Image();
                image.onload = () =>  {this.imgLoaded[i] = true}
                image.src = this.sections[i]['img']['src'];
            }
        }
    }

    ngOnInit(): void {
        this.observable = RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => { this.updateImageDims() });
    }

    ngOnDestroy() {
        window.scrollTo(0,0);
        this.observable.unsubscribe();
    }
    setStyle(styles: any): any {
        return styles;
    }

    @ViewChildren('parallex')
    parallex: any;

    private updateImageDims() {
        this.parallex.forEach((e, i) => {e.updateImageDims()});
    }

} 
