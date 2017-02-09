import { 
    AfterViewChecked,
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
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {

    private removeSplash: Boolean = true;
    private observable: any;

    constructor() {}
    ngOnInit(): void { 
        this.observable = RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => { this.updateImageDims() });
    }
    ngOnDestroy(): void {
        this.observable.unsubscribe();
    }

    ngAfterViewChecked(): void {
        if(this.removeSplash) {
            this.removeSplash = false;
            document.getElementById("splash").remove();
        }
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
