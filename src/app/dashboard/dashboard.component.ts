import { Component, OnInit } from '@angular/core';

import { dashboardConfig } from './dashboard.config';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private sections = dashboardConfig.sections;

    constructor() { 
    }

    ngOnInit() {
        window.scrollTo(0,0);
    }

    setStyle(styles: any): any {
        return styles;
    }

} 
