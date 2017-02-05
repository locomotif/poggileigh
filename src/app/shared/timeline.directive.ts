import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Renderer,
    OnInit,
    OnDestroy,
    Output

} from '@angular/core';

import * as d3 from "d3/index";
import { D2Util } from './d2.util';
import { TextBubbleService, TextBoxService, TimelineConfigService } from './index';

@Directive({
    selector: '[appTimeline]',
    providers: [TextBubbleService, TextBoxService, TimelineConfigService]
})
export class TimelineDirective implements OnInit, OnDestroy {

    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    private d3Svg: any; // svg  element
    private svg: any; // d3 selection of svg wrapper element
    private svgW: number;
    private svgH: number;


    private d3Path: any; // d3 selection of path element
    private d3XAxisScale: any;
    private xAxis: any;
    private axisGroup: any;

    private tlTrans: any;
    private transitionState: number;

    private tl: any; // timeline

    private ng2Attr: string;

    private margin: any = { top: 30, right: 20, bottom: 30, left: 50};
    private width: number = 600 - this.margin.left - this.margin.right;
    private height: number = 270 - this.margin.top - this.margin.bottom;
    private parseDate: any = "%m/%y";

    private tickCount: number = 0;
    private tickLocation: number = 0;

    private data: number[][] = [[0,350],[0,350]];
    private duration: number = 500;

    private config: any;

    constructor(
        private tlConf: TimelineConfigService,
        private el: ElementRef,
        private renderer: Renderer,
        private tb: TextBubbleService
    ) { }

    ngOnDestroy() {
        /*
         * text-bubble destroy is necessary to clean up a static property which
         * causes unperedicable behavior on single page application
         */
        this.tb.destroy();
    }

    getConfig(): void {
        this.config = this.tlConf.getResumeConfig();

    }

    ngOnInit() {
        this.getConfig();

        /*
         * Extract the attribute applied by ng2 to manually created nodes.
         * This will ensure that I can persist container styles to appropriate
         * elements
         *
         * @todo I still need to dig into why I am unable to use elements
         * generated with Rendered and sending them to D3
         */
        for(let k in this.el.nativeElement.attributes){
            if(this.el.nativeElement.attributes[k].name && this.el.nativeElement.attributes[k].name.match(/^_ngcontent/)) {
                this.ng2Attr = this.el.nativeElement.attributes[k].name;
                break;
            }
        }

        /* 
         * Create SVG element if target element is not svg
         *
         * @todo there is a bug here.  I have examined the parent css
         * attributes, and tweeked them so that they are the same, and for odd
         * reason the path is not being rendered on the dom and the target
         * locations. it appears as if it is stuck to the top right of the
         * parent.  Currently this directive only works if attached to a svg
         * element
         * 
         */
        if (this.el.nativeElement.tagName === 'svg') {
            this.svg = this.el.nativeElement;
            this.d3Svg = d3.select(this.el.nativeElement);
        } else {
            this.svg = this.renderer.createElement(
                this.el.nativeElement,
                'svg'
            );
            this.d3Svg = d3.select(this.svg);
        }
        /* 
         * Get parent node's rect dimensions 
         * - using destructuring
         */
        ({width: this.svgW, height: this.svgH} = D2Util.getParentDim(this.svg));
        /*
         * Set the Timeline Scale.  Logic will be relative the timeline scale
         */
        this.setTimeLineScale();

        this.tickCount = this.config.length;
        this.tickData(0);

        /*
         * Set the svg attributres
         */
        this.d3Svg
        .attr("width", this.svgW)
        .attr("height", this.svgH)
        .attr("xmls","http://www.w3.org/2000/svg")
        .classed('timeline-container', true);

        this.setXAxis();

        /* append the group to svg */
        this.d3Path = this.d3Svg
        .append("g")
        .attr(this.ng2Attr,"")
        .append("path")
        .attr(this.ng2Attr,"")
        .classed("timeline", true);

        /* instantiate the line generator */
        this.tl = d3.line()
        .x((d) => {return d[0]})
        .y((d) => {return d[1]});

        this.setTrans();

        this.transitionState = 0;
        this.d3Path
        .datum(this.data)
        .attr("d", this.tl);

        /* initiate tick event */
        this.tickData(this.tickLocation);
        this.render();

    }

    /*
     * tick Data will unpdate the data to next location based on the resume config constant
     * @param number tick is the target tick
     */
    private tickData(tick: number): Boolean {
        if( typeof this.config[tick] != "undefined") {
            let start = this.config[tick].start;
            this.data[this.data.length - 1][0] = this.d3XAxisScale(start);
            return true;
        }
        return false;
    }

    /*
     * "Scales are functions that map from an input domain to an output range"
     * - Scales are functions
     * - Normalization is the process of mapping a numeric value to a new value between 0 and 1
     */
    private setTimeLineScale() {

        let startDate = new Date(this.config[0].start.getTime());
        startDate.setMonth(startDate.getMonth() - 3);

        let endDate = new Date;
        let padding = 20;

        this.d3XAxisScale = d3.scaleLinear()
        .domain([startDate, endDate])
        .range([0, this.svgW])
        .clamp(true);
    }


    private setXAxis() {
        //note: that the resume config file has entries that are in chronological order.
        let flatten = (item, acc) => item.reduce(((accumulator, currentValue, currentIndex, arr) => {
            // If date is already in array do not add
            if (accumulator[accumulator.length-1] != currentValue.start)
                accumulator.push(currentValue.start);
            return accumulator;
        }), acc);
        let tickDates: Date[] = flatten(this.config, []);

        this.xAxis = d3.axisBottom(this.d3XAxisScale)
        .tickPadding(8)
        .tickValues(tickDates)
        .tickFormat(d3.timeFormat(this.parseDate))
        .tickSizeOuter(0);

        this.axisGroup = this.d3Svg
        .append("g")
        .attr(this.ng2Attr,"")
        .classed("x-axis", true)
        .attr("transform", "translate(0,350)")
        .call(this.xAxis);

        // Bind events ticks
        this.axisGroup.selectAll('.x-axis .tick').on("click", function(){console.log(arguments);});
    }

    @HostListener('window:keydown', ['$event'])
    private onKeydown(e: any) {
        /*
         * 37 left, 38 up, 39 right, 40 down  
         */
        if( e.which >= 37 || e.which <= 40 ){
            this.animate(e.which);
        }
    }


    private setTrans() {
        /* instantiate transition */
        this.tlTrans = d3.transition("tl_trans")
        .duration(this.duration)
        .ease(d3.easeLinear);
    }

    private animate(dir: number): void {
        // Do not animate if a bubble is scheduled or rendering
        if( this.tb.isAnyRendering() ) {
            return;
        }

        // check current state of path, if zero continue
        if(this.transitionState != 3 ) {
            dir === 37 || dir === 40 ? this.tickLocation-- : this.tickLocation++;
            if (this.tickLocation < 0 ) {
                this.tickLocation = 0;
            } else if (this.tickLocation > this.tickCount - 1) {
                this.tickLocation = this.tickCount - 1;
            } else {

                // Temporary
                // @todo change this logic
                this.tb.removeRendered();

                this.tickData(this.tickLocation);
                this.render();
            }
        }
    }


    private render(){
        try {
            if (this.transitionState == 3) {
                this.d3Path.transition().duration(0);
                this.setTrans();
                this.transitionState = 0;
                this.render();
            } else if (this.transitionState == 6) {
                this.setTrans();
                this.transitionState = 0;
                this.render();
            } else {
                this.setTrans();
                this.d3Path
                .datum(this.data)
                .transition(this.tlTrans)
                .attr("d", this.tl)
            .on("start", this.transitionEvents.bind(this, "start"))
            .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
            .on("end", this.transitionEvents.bind(this, "end")) ;
            }
        } catch (e) {
            console.log(e);
        }
    }

    /*
     * The following methods should only be executed via d3js transition
     * callback. In order to comply I check that argument[2] is defined.
     * Obviously one could trick this method into execution, but for no gain.
     */
    private transitionEvents(type: string) {
        let bubbleVisibilityAttr = function(elem: any[], value) {
            for(let i in elem) {
                d3.select(elem[i]).attr("bubble-visibility", value);
            }
        };
        switch(type) {
            case "start":
                // @todo dont forget to clean this up
                this.change.emit(this.tickLocation);

                this.transitionState = 3;
                break;
            case "interrupt":
                this.transitionState = -1;
                break;
            case "end":
                this.transitionState = -2;
                let bubbleMessage = this.tb.getBubble(
                    'D3Bubble',
                    {
                    svg: this.d3Svg,
                    startX: this.data[this.data.length-1][0],
                    startY: this.data[this.data.length-1][1],
                    message: this.config[this.tickLocation].message,
                    rect: {},
                    attr: this.ng2Attr
                    }
                );
                bubbleMessage.render();
                break;
            default:
                break;
        }
    }

    @HostListener('window:resize')
    private onResize() {

        let windowW = window.innerWidth + window.scrollX;

        // Update Svg to new scale
        this.svgW = windowW;
        this.d3Svg
        .attr("width", this.svgW)
        .attr("height", this.svgH)
        .style("width", this.svgW + "px");

        // Update the scale
        this.d3XAxisScale
        .range([0, this.svgW]);

        // Transition axis to new scale
        this.axisGroup
        .transition()
        .duration(this.duration)
        .call(this.xAxis);

        // remove any bubbles
        // @todo instead of removing them transition them
        this.tb.removeRendered();

        // Transition timeline to new scale
        this.tickData(this.tickLocation);
        this.render();


    }

    /*
     * @see http://blog.sodhanalibrary.com/2016/10/angular-2-directive-for-mouse-wheel.html#.WIgjcrYrLUI
     * From: Srinivas Dasari
     */
    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        this.mouseWheelFunc(event);
    }
    mouseWheelFunc(event: any) {
        if (this.transitionState != 3 && this.transitionState != -2) {
            event = window.event || event; // old IE support
            let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            if(delta > 0) {
                this.animate(37);
            } else if(delta < 0) {
                this.animate(39);
            }
            // for IE
            event.returnValue = false;
            // for Chrome and Firefox
            if(event.preventDefault) {
                event.preventDefault();
            }
        }
    }
}
