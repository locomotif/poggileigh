import { 
    AfterViewChecked,
    Component,
} from '@angular/core';

import * as RX from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

    private removeSplash: Boolean = true;

    constructor() {}

    ngAfterViewChecked(): void {
        if(this.removeSplash) {
            this.removeSplash = false;
            document.getElementById("splash").remove();
        }
    }

}
