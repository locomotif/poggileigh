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
    @Input("myPathConf") _conf: pathConf = {xCoor:[[0,0],[0,0]]};
    get conf(): pathConf { return this._conf }
    set conf(a: pathConf) { this._conf = a; }

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

    /* experiments between using a path or rect, cannot apply gradient on a
     * horizontal path, so we need rect */
    private path: any;
    private rect: any;

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
            //this.setGradient();
            // instantiate the path
            this.setTransform();
            this.setPath();
            //this.setRect();
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
        return d3.active(this.path.node(), "transition-path") === null ? false : true;
    }

    private render() {
        this.renderPath();
        //this.renderRect();
    }

    private renderRect() {
        this.rect
        .data([{x: 0, y: 0, w: this.conf.xCoor[1][0]}])
        .transition("transition-path")
        .duration(this.transitionConf.duration)
        .ease(this.transitionConf.ease)
        .attr("x", (d) => {return d.x})
        .attr("y", (d) => {return d.y})
        .attr("width", (d) => {return d.w})
        .attr("height", 1)
        .attr("fill", "url(#gradient)")
        .on("start", this.transitionEvents.bind(this, "start"))
        .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
        .on("end", this.transitionEvents.bind(this, "end")) ;
    }

    private renderPath() {
        /*
         * Make it restrictive. If there is a transition, then wait
         */
        this.path
        .datum(this.conf.xCoor)
        .transition("transition-path")
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

    private setTransform(){
        d3.select(this.el.nativeElement)
        .attr("transform", this.transform)
        .classed("timeline", true);
    }

    private setPath() {
        this.path = d3.select(this.renderer.createElement(this.el.nativeElement,":svg:path"))
        .classed("timeline-path", true)
        .datum(this.conf.xCoor) 
        .attr("d", this.line);
    }

    private setRect() {
        this.rect = d3.select(this.renderer.createElement(this.el.nativeElement,":svg:rect"))
        .classed("timeline-rect", true);
        
    }

    private setGradient() {
        let defs = d3.select(this.el.nativeElement).append("defs");
        let gradient = defs.append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

        gradient.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);

        gradient.append("stop")
        .attr('class', 'end')
        .attr("offset", "95%")
        .attr("stop-color", "#FFF")
        .attr("stop-opacity", 1);

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
                /*
                d3.select(this.el.nativeElement).select("#gradient .end")
                .transition("transition-path-gradient")
                .duration(500)
                .attr("stop-color", "#000");
                */
                break;
            default:
                break;
        }
    }
}

export class pathConf {
    xCoor: number[][];
}
