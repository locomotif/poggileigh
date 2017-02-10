/**
 * Use of this directive requires for the component to do the following, since
 * it is dependent on another directive <TimelinePathDirective> - also meant to be executed on svg tags:
 *
 * ```typescript
 * @Component({
 *  selector: 'app',
 *  template: `
 *  <g appTimelinePath appTimelineShap
 *      [myShapeConf]="shapeConf"
 * 
 *      #message="timelineShape" 
 *      [myTimelineShapeDirective]="timelineShapeDirective" 
 *  ></g>
 *  `
 * })
 * class export someclass {
 *  @ViewChild('message')
 *  timelineShapeDirective: any
 * }
 * ```
 *
 * now this property can be access by other directives with the @Input
 *
 * @todo - I need to learn more about @ViewChild, @ContentChild,..... queries
 * to probably find a better solution.  I only ran into road blocks and
 * undefined properties.
 * 
 */
import { 
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    OnChanges,
    OnDestroy,
    Output,
    Renderer,
} from '@angular/core';

import * as d3 from "d3/index";
import { controlFlow } from './index';

const state = {
    HIDDEN: 0,
    VISIBLE: 1
}

export class shapeConf {
    origin: number[];
    rect?: {
        width: number;
        height: number;
    }
}

@Directive({
    selector: '[appTimelinePath][appTimelineShape]',
    exportAs: "timelineShape"
})
export class TimelineShapeDirective implements OnInit, OnChanges, OnDestroy {


    // get data for axis coordinates
    @Input("myShapeConf") conf: shapeConf = {origin: [0,0]};

    // set a default transition.
    @Input("myTransition") transitionConf: any = {duration: 0, ease: d3.easeLinear};
    @Input("myTranslate") private translate: number[]  = [0,0];

    @Output("timelineShapeControlFlow") transitionCycle: EventEmitter<controlFlow> = new EventEmitter<controlFlow>();

    @Input("myObservable") observable: any ;
    private subscription: any;
    private observer: any;
    private signature: any;

    private initialized = false;
    private state: number = 0;
    private path: any;
    private shape: any;
    private dims: any;
    private transform: string  = "";

    private _boundingClientRect: any;
    get boundingClientRect() {
        return this._boundingClientRect;
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ) { 
        this.observer = {
            next: (x) => { 
                if(x.target === this) this.signature = x; 
            },
            error: (err) => console.log(err),
                complete: () => {console.log("complete notified");},
        };
            this.setGradient();
    }


    ngOnInit() {
        d3.select(this.el.nativeElement)
        .attr("transform", this.transform)
        this.path = d3.select(this.renderer.createElement(this.el.nativeElement,":svg:path"))
        .classed("timeline-shape", true);
        this.setState(state.HIDDEN);
        this.init();
    }

    ngOnChanges(prop) {
        if(prop.translate) {
            this.transform = "translate(" + this.translate[0] + "," + this.translate[1] + ")";
        }
        // set container dimensions
        if (!this.initialized) {
            this.subscription = this.observable.subscribe(this.observer);
            this.initialized = true;
        } else {
            if(this.state === state.VISIBLE) {
                this.moveShape();
            } else {
                this.render();
            }
        }
    }

    ngOnDestroy() {
        if(typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }
    private setGradient() {
        let defs = d3.select(this.el.nativeElement).append("defs");
        let gradient = defs.append("linearGradient")
        .attr("id", "gradient-shape")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");

        gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "#CCC")
        .attr("stop-opacity", 1)

        gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "90%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1)

        gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "99%")
        .attr("stop-color", "#FFF")
        .attr("stop-opacity", 1)

        gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", "#FFF")
        .attr("stop-opacity", 1)

    }

    private setState(state: number): void {
        this.state = state;
    }

    /**
     * Render the shape
     */
    private render(): void {
        this.setState(state.VISIBLE);
        this.setDims();
        this.setShape();
        this.d3EventListen(this.path
                           .transition("timeline-shape")
                           .duration(this.transitionConf.duration)
                           .ease(this.transitionConf.ease)
                           .attr("d", this.shape.toString())
                          );
    }
    moveShape(): void {
        this.setDims();
        this.setShape();
        this.d3EventListen(this.path
                           .transition("timeline-shape")
                           .duration(this.transitionConf.duration)
                           .ease(this.transitionConf.ease)
                           .attr("d", this.shape.toString())
                          );
    }

    unRender(): void {
        this.setState(state.HIDDEN);
        this.setShape(true);
        this.d3EventListen(this.path
                           .transition("timeline-shape")
                           .duration(this.transitionConf.duration)
                           .ease(this.transitionConf.ease)
                           .attr("d", this.shape.toString())
                          );
    }


    private init(): void {
        this.setDims();
        this.setShape(true);
        this.path.attr("d", this.shape.toString());
    }

    private d3EventListen(transition: any): void {
        transition.on("start", this.transitionEvents.bind(this, "start"))
        .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
        .on("end", this.transitionEvents.bind(this, "end"));
    }

    isVisible(): Boolean {
        return this.state === 0 ? false : true;
    }

    destroy(): void {
    }

    private transitionEvents(action: string) {
        // parent component is handling the transition life cycle
        this.transitionCycle.emit({
            action: action,
            signature: this.signature
        });
        switch(action) {
            case "start":
                /* add logic, when necessary */
            break;
            case "interrupt":
                /* add logic, when necessary */
            break;
            case "end":
                /* add logic, when necessary */
            break;
            default:
                break;
        }
    }

    private setDims(): void {
        this.dims = this.el.nativeElement.parentNode.getBoundingClientRect();
    }

    /**
     * Sets the 2D characteristics of the shape
     *
     * @param Boolean reset :will set the characteristics to a flat line which
     * is dimensionless, so that when dimensions are implemented they have
     * something to transition from
     */
    private setShape(reset?: Boolean) {
        reset = reset || false;
        let startX: number, startY: number;
        let { top, bottom, left, right, margin, offset, radius } = this.getShapeDims();

        startX = this.conf.origin[0];
        startY = this.conf.origin[1];
        if(reset) {
            radius = 1;
            right = left = this.conf.origin[0];
            top = bottom = this.conf.origin[1];
        }

        this.shape = d3.path();
        // start point
        this.shape.moveTo( startX, startY);
        //stem up
        this.shape.lineTo( startX, bottom);
        // line to right
        this.shape.lineTo( right - radius, bottom);
        // arc up
        this.shape.arcTo( right, bottom, right, bottom - radius, radius);
        // line up
        this.shape.lineTo( right, top + radius);
        // arc left
        this.shape.arcTo( right, top, right - radius, top, radius);
        // line left
        this.shape.lineTo( left + radius, top);
        // arc down
        this.shape.arcTo( left, top, left, top + radius, radius);
        // line down
        this.shape.lineTo( left, bottom - radius);
        // arc right
        this.shape.arcTo( left, bottom, left + radius, bottom, radius);
        // line back to origin
        this.shape.lineTo( startX, bottom);
        this.shape.closePath();
    }

    private getShapeDims() {

        let {width, height} = this.dims;

        let rectW = this.conf.rect ? this.conf.rect.width : 400;
        let rectH = this.conf.rect ? this.conf.rect.height : 200;

        let offset = 10;
        let margin = 10;
        let radius = 10;

        rectW = width - margin * 2 < rectW ? width - margin * 2 : rectW;
        rectH = height - offset * 2 < rectH ? height - offset * 2 : rectH;


        // position of tick
        let startX = this.conf.origin[0];
        let startY = this.conf.origin[1];
        let right: number;
        let left: number;

        // get dims from smallest width
        if (startX < width/2) {
            left = startX - margin < rectW /2 ? margin : startX - rectW / 2;
            right = left + rectW;
        } else {
            right = width - startX - margin < rectW /2 ? width - margin*2 : startX + rectW / 2;
            left = right - rectW;
        }
        let top = startY - rectH - offset;
        let bottom = startY - offset;

        this._boundingClientRect = {
            width: rectW,
            height: rectH,

            top: top,
            bottom: bottom,
            left: left,
            right: right,

            margin: margin,
            offset: offset,
            radius: radius,
        };

        return this._boundingClientRect;
    }
}

