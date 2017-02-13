import { 
    Directive,
    ElementRef,
    Input,
    OnChanges,
    Renderer,
} from '@angular/core';
import * as d3 from "d3/index";

@Directive({
    selector: '[appDivExpand]'
})
export class DivExpandDirective implements OnChanges {

    private width: number = 270;
    @Input("myDivExpandState") show: Boolean;

    private d3div: any;

    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ) { }

    ngOnChanges(prop) {
        if(!this.d3div)
            this.d3div = d3.select(this.el.nativeElement);
        this.animateDiv();
    }
    private animateDiv(): void {
        if(this.show){
            this.d3div.transition().duration(200).style("width", this.width + "px");
        } else {
            this.d3div.transition().duration(200).style("width", "0px");
        }
    }
}
