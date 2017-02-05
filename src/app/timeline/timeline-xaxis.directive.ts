import { 
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    OnChanges,
    Output,
    OnDestroy,
} from '@angular/core';

import * as d3 from "d3/index";
import { controlFlow } from './index';

@Directive({
    selector: '[appTimelineXaxis]',
    exportAs: "timelineAxis",
})
export class TimelineXaxisDirective implements OnInit, OnChanges, OnDestroy {

    // configuration data
    @Input("myXAxisConf") conf: xAxisConf;
    // get transpose
    @Input("myTranslate") private translate: number[]  = [0,0];
    // set a default transition.
    @Input("myTransition") transitionConf: any = {duration: 0, ease: d3.easeLinear};

    @Input("myObservable") observable: any ;
    private subscription: any;
    private observer: any;
    private signature: any;

    @Output("timelineXAxisControlFlow") transitionCycle: EventEmitter<controlFlow> = new EventEmitter<controlFlow>();


    private initialized: Boolean = false;
    private scale: any;
    private axis: any;
    private transform: string  = "";
    private parseDate: any = "%B %Y";

    // @todo read more about why, transition end is really not the end. probably to allow chaining?
    // this is hack so I know when transitions are completed to finish
    private transitionCount: number = 0;

    constructor(
        private el: ElementRef
    ) { 
        this.observer = {
            next: (x) => { 
                if(x.target === this) this.signature = x; 
            },
            error: (err) => console.log(err),
            complete: () => {console.log("complete notified");},
        };

        // set default conf
        this.conf = { 
            domain: [new Date, new Date],
            range: [0, 0],
            data: [],
        }
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
            this.subscription = this.observable.subscribe(this.observer);
            this.initialized = true;
        } else {
            // reset the scale
            this.setLinearScale();
            this.render();
        }

    }

    ngOnDestroy() {
        if(typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }

    private render() {
        // create the axis
        this.axis = d3.axisBottom(this.scale)
        .tickPadding(8)
        .tickValues(this.conf.data)
        .tickFormat(d3.timeFormat(this.parseDate))
        .tickSizeOuter(0);

        // render the axis
        d3.select(this.el.nativeElement)
        .classed("x-axis", true)
        .attr("transform", this.transform)
        .transition("timeline_xpath")
        .duration(100)
        .ease(d3.easeLinear)
        .call(this.axis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start")
        .on("start", this.transitionEvents.bind(this, "start"))
        .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
        .on("end", this.transitionEvents.bind(this, "end")) ;

        /*
        // Bind events ticks
        this.axisGroup.selectAll('.x-axis .tick').on("click", function(){console.log(arguments);});
         */
    }

    private transitionEvents(action: string) {
        switch(action) {
            case "start":
                if (this.transitionCount === 0) {
                this.transitionCount = arguments[3].length;
            }
            break;
            case "interrupt":
                this.transitionCount = 0;
                /* add logic, when necessary */
            break;
            case "end":
                if(--this.transitionCount <= 0) {
                    // parent component is handling the transition life cycle
                    this.transitionCycle.emit({
                        action: action,
                        signature: this.signature
                    });
                }
                break;
            default:
                break;
        }
    }

    /*
     * "Scales are functions that map from an input domain to an output range"
     * - Scales are functions
     * - Normalization is the process of mapping a numeric value to a new value between 0 and 1
     */
    private setLinearScale(): void {
        this.scale = d3.scaleLinear()
        .domain(this.conf.domain)
        .range(this.conf.range)
        .clamp(true);
    }

    getActiveTickLocation(index: number): number {
        return this.scale(this.conf.data[index]);
    }

}

export class xAxisConf {
    domain: Date[];
    range: number[];
    data: Date [];
}
