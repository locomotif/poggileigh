import {
    Input,
    ElementRef,
    HostListener,
    Inject,
    OnInit,
    Renderer,
    Directive
} from '@angular/core';
import * as d3 from "d3/index";

@Directive({
    selector: '[appOverlay]'
})
export class OverlayDirective implements OnInit {
    private overlay: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ) { }

    ngOnInit(): void {

        /* Add details to overlay */
        if (this.el.nativeElement.tagName === 'svg') {
            this.overlay = d3.select(this.el.nativeElement);
        } else {
            this.overlay = d3.select(
                this.renderer.createElement(
                    this.el.nativeElement,
                    'svg'
                )
            );
        }
        this.overlay.attr("width", '100%')
        .attr("height", '100%')
        .classed("svg_context", true);
    }
}
