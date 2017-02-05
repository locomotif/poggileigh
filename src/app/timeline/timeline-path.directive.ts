import { 
    Directive,
    Input,
    ElementRef,
    EventEmitter,
    OnInit,
    OnChanges,
    OnDestroy,
    Output,
    Renderer,
} from '@angular/core';

import * as d3 from "d3/index";
import { controlFlow } from './index';

@Directive({
    selector: '[appTimelinePath]',
    exportAs: "timelinePath",
    queries: { }
})

export class TimelinePathDirective implements OnInit, OnChanges, OnDestroy {

    // get data for axis to set ticks
    @Input("myPathConf") conf: pathConf = {xCoor:[[0,0],[0,0]]};

    // set a default transition.
    @Input("myTransition") transitionConf: any = {duration: 0, ease: d3.easeLinear};
    @Input("myTranslate") private translate: number[]  = [0,0];

    @Input("myObservable") observable: any ;
    private subscription: any;
    private observer: any;
    private signature: any;

    @Output("timelinePathControlFlow") transitionCycle: EventEmitter<controlFlow> = new EventEmitter<controlFlow>();

    private initialized: Boolean = false;
    private transform: string  = "";
    private line: any;
    private path: any;


    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ) {
        this.observer = {
            next: (x) => { 
                if(x.target === this) this.signature = x;
            },
            error: (err) => console.log(err),
            complete: () => { console.log("complete notified"); },
        };
    }

    ngOnInit() { }

    /*
     * This will be fired once our input data has been initialized by the host
     */
    ngOnChanges(prop) {
        if(prop.translate) {
            this.transform = "translate(" + this.translate[0] + "," + this.translate[1] + ")";
        }
        if (!this.initialized) {
            // instantiate the line generator
            this.setLine();
            // instantiate the path
            this.setPath();
            this.subscription = this.observable.subscribe(this.observer);
            this.initialized = true;
        } else {
            this.render();
        }
    }

    ngOnDestroy() {
        if(typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }

    isRendering(): Boolean {
        return d3.active(this.path.node(), "timeline-path") === null ? false : true;
    }

    private render() {
        /*
         * Make it restrictive. If there is a transition, then wait
         */
        this.path
        .datum(this.conf.xCoor)
        .transition("timeline-path")
        .duration(this.transitionConf.duration)
        .ease(this.transitionConf.ease)
        .attr("d", this.line)
        .on("start", this.transitionEvents.bind(this, "start"))
        .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
        .on("end", this.transitionEvents.bind(this, "end")) ;
    }

    private setLine() {
        this.line = d3.line()
        .x((d) => {return d[0]})
        .y((d) => {return d[1]});
    }

    private setPath() {
        d3.select(this.el.nativeElement)
        .attr("transform", this.transform)
        .classed("timeline", true);
        this.path = d3.select(this.renderer.createElement(this.el.nativeElement,":svg:path"))
        .datum(this.conf.xCoor) 
        .attr("d", this.line);
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
                break;
            default:
                break;
        }
    }
}

export class pathConf {
    xCoor: number[][];
}
