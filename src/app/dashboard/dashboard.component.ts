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
export class DashboardComponent implements OnInit, OnDestroy {

    @ViewChildren('parallex')
    parallex: any;

    private sections = dashboardConfig.sections;
    private imgLoaded: Boolean[] =[];

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

    ngOnInit() { 
        RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => { this.updateImageDims() });
    }
    ngOnDestroy() {
        window.scrollTo(0,0);
    }
    setStyle(styles: any): any {
        return styles;
    }

    private updateImageDims() {
        let list = this.parallex._results;
        for(let i in list){
            setTimeout(() => list[i].updateImageDims(), 0);
        }
    }

} 
