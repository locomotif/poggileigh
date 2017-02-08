import { 
    Component,
    OnInit, 
    OnDestroy,
    QueryList,
    ViewChildren,
} from '@angular/core';

import * as RX from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    private observable: any;

    constructor() {}
    ngOnInit() { 
        this.observable = RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => { this.updateImageDims() });
    }
    ngOnDestroy() {
        this.observable.unsubscribe();
    }

    @ViewChildren('parallex')
    parallex: any;

    private updateImageDims() {
        let list = this.parallex._results;
        for(let i in list){
            setTimeout(() => list[i].updateImageDims(), 0);
        }
    }

}
