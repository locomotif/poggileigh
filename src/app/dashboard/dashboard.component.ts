import { 
    Component, 
    OnInit, 
    OnDestroy,
} from '@angular/core';

import { dashboardConfig } from './dashboard.config';
import * as RX from 'rxjs/Rx';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

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

    ngOnDestroy() {
        window.scrollTo(0,0);
    }
    setStyle(styles: any): any {
        return styles;
    }
} 
