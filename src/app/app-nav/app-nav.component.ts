import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './app-nav.component.html',
    styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

    private button: any;
    constructor(
        private router: Router,
        private renderer: Renderer,
        private el: ElementRef
    ) { 
        this.router.events.subscribe((a) => {
            // if triggered there was a routing event. Ensure that bootstrap
            // nav is collapsed after trigger
            if(this.button.getAttribute('aria-expanded') == "true") {
                this.button.click();
            }
        });

    }

    ngOnInit() {
        let target = "BUTTON";
        let setButton = (a) => {
            if (a.length > 0){
                for(let i in a) {
                    if(a[i].tagName) {
                        if(a[i].tagName.toUpperCase() == target) {
                            this.button = a[i];
                            break;
                        } else setButton(a[i].children);
                    }
                }
            }
        }
        setButton(this.el.nativeElement.children);
    }

}
