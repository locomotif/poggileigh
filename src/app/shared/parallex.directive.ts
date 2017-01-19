import { 
    Directive, 
    ElementRef, 
    HostListener,
    OnInit,
    Renderer,
    Input 
} from '@angular/core';

import { parallexConfig } from './parallex.config'; 
import { D2Util } from './d2.util';

@Directive({
    selector: '[appParallex]',
    providers:[
        {provide: parallexConfig, useValue: parallexConfig}
    ]
})
export class ParallexDirective implements OnInit {

    @Input() private images: any[] = [];
    private static seq: number = 0;

    constructor(
        private el: ElementRef, 
        private renderer: Renderer
    ) { } 

    ngOnInit() {

        this.constructor["seq"]++
            this.renderer
        .setElementAttribute(
            this.el.nativeElement, 
            'data-seq', 
            this.constructor["seq"].toString() 
        );
        this.renderer.listen(
            this.el.nativeElement, 
            'load', 
            (event: {}) => {
                let index = this.el.nativeElement.getAttribute('data-seq'); 

                /* set original coordinates */
                let elementRect: any = this.el.nativeElement.getBoundingClientRect();
                this.images[index] = {
                    top: elementRect.top + window.scrollY,
                    right: elementRect.right,
                    bottom: elementRect.bottom,
                    left: elementRect.left,
                    lastY: elementRect.top,
                    offsetTop: this.el.nativeElement.offsetTop
                }
                this.moveImage();
            });
    }

    @HostListener('window:scroll')
    private onScroll() {
        this.moveImage();
    }

    /**
     * move image depending on it current window location
     */
    private moveImage(): void {

        let i: number = this.el.nativeElement.getAttribute('data-seq'); 
        let screenCoor: any = {
            top: window.scrollY,
            right: (window.innerWidth + window.scrollX),
            bottom: (window.innerHeight + window.scrollY),
            left: window.scrollX 
        };

        /* use original coordinates */
        let elementCoor: any = this.images[i];
        if(D2Util.rectInRect(screenCoor, elementCoor)) {
            let diff = ((Math.ceil(elementCoor.lastY - window.scrollY)) * parallexConfig.ratio) * -1;
            this.images[i].lastY = window.scrollY;
            this.el.nativeElement.style.marginTop = (this.el.nativeElement.offsetTop + diff) + "px" ;
        } else {
            /* reset offsetTop */
            this.el.nativeElement.style.marginTop = (this.images[i].offsetTop) + "px" ;
            this.images[i].lastY = this.images[i].top;
        }
    }
}
