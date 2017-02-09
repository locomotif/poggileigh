import { 
    Component, 
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
    OnInit,
    OnDestroy,
    AfterContentInit,
    Renderer,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

//import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Subject';

import * as RX from 'rxjs/Rx';

import * as d3 from "d3/index";
import { D2Util } from '../shared/index';
import { xAxisConf, pathConf, shapeConf} from './index';
import { TimelineConfigService } from '../shared/index';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',

    //@todo investigate this further
    // Since using the d3js library, they create many nodes; which I would need
    // to extract the attribute ng adds to all elements inorder to encapsulate
    // them.  Then add these attributes to all generated nodes by d3.  This
    // paramter will remove that encapsulation, and I can continue to write my
    // css in the components css file.
    encapsulation: ViewEncapsulation.Native, 

    styleUrls: ['./timeline.component.scss'],
    providers: []

})
export class TimelineComponent implements OnInit, AfterContentInit, OnDestroy {


    /*
     * @todo
     * There must be a better way to do this, but currently I need to settle, so I can move on.
     * Here I am going to set the child directive TimelineShapeDirective to an
     * input, so that another directive can access it. I have used queries, but
     * maybe I am just not sure how to manuver them correctly.
     */
    @ViewChild('shape')
    timelineShapeDirective: any;
    @ViewChild('path')
    timelinePathDirective: any;
    @ViewChild('xaxis')
    timelineXAxisDirective: any;
    @ViewChild('message')
    timelineMessageComponent: any;

    /* svg g transpose */
    translate: number[] = [10,500];

    /* Timeline axis directive paramters */
    axisConf: xAxisConf;
    /* Timeline path directive parameters */
    pathConf: pathConf = {xCoor: [[0,0],[0,0]]};
    /* Timeline shape directive parameters */
    shapeConf: shapeConf = {origin: [0,0]};

    selectedMessage: string;
    messagePosition: any;

    /* d3 transition that can be shared amongs all d3 elements */
    transition: any;
    duration: number = 300;

    /* @var activeTick :current location on axis */
    _activeTick: number = 0;
    get activeTick(): number { return this._activeTick; }
    set activeTick(a: number) {
        let l = this.axisConf ? this.axisConf.data.length : this.config.length();
        if (a < 0 ) this.activeTick = 0;
        else if (a >= l ) this.activeTick = --l;
        else this._activeTick = a;
    }

    /**
     * @var observable :rxjs observable object for communication with directives
     */
    private observable:any;

    private eventCounter: number = 0;
    private renderingQueue: any[] = [];
    private processQueue: any[] = [];

    constructor(
        private renderer: Renderer,
        private el: ElementRef,
        private config: TimelineConfigService
    ) {
        this.observable = new RX.BehaviorSubject({target: null, sig: null});
        this.activeTick = this.config.length() - 4;
        this.setTransition();
    }

    ngOnInit() {
        RX.Observable.fromEvent(window,'resize')
        .debounceTime(200)
        .subscribe((x) => {this.updateValues()});

        /* set timeline axis parameters */
        this.queueXAxisAnimate();
        this.queuePathAnimation();
        this.queueShapeAnimation(true);
        this.queueShowMessage();
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
        this.eventCounter = 0;
    }

    private setTransition(): void {
        this.transition = {
            duration: this.duration,
            ease: d3.easeLinear
        };
    }
    private isRendering(): Boolean {
        if(this.renderingQueue.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    private updateValues(): void {
        if(this.timelineShapeDirective.isVisible()) {
            this.hideMessage();
            this.queueShapeAnimation(false);
            this.queueXAxisAnimate();
            this.queuePathAnimation();
            this.queueShapeAnimation(true);
            this.queueShowMessage();
        } else {
            this.queueXAxisAnimate();
            this.queuePathAnimation();
        }
    }

    /**
     * onKeydown if its left or right arrow move tick
     *  only using 37, and 39
     *   37 left, 38 up, 39 right, 40 down  
     *
     * @param e :window event
     */
    @HostListener('window:keydown', ['$event'])
    private onKeydown(e: any) {
        if(!this.isRendering()) {
            let current = this.activeTick;
            let which = e.which;
            if( which >= 37 && which <= 40 ) which === 37 || which === 40 ? this.activeTick-- : this.activeTick++;
            if(current != this.activeTick) {
                // if active bubble, destruct
                if(this.timelineShapeDirective.isVisible()) {
                    this.hideMessage();
                    this.queueShapeAnimation(false);
                }
                this.queuePathAnimation();
                this.queueShapeAnimation(true);
                this.queueShowMessage();
            }
        }
    }

    /**
     * queueXAxisAnimation :schedules the animation of the axis.
     */
    private queueXAxisAnimate() {
        setTimeout(() => this.scheduleProcess(
            this.setTimelineAxis.bind(this), 
            this.timelineXAxisDirective, 
            "animate-xaxis"
        ), 0);
    }
    private setTimelineAxis() {
        // set the first timeline event start and last timeline event end date
        // x-axis domain variable
        let allDates: any = this.config.getAllDates();

        let xAxisDomain  = [allDates[0].date, allDates[allDates.length-1].date];

        // set the range. x-axis range. how long does it need to be
        let {width} = this.el.nativeElement.getBoundingClientRect();

        // add padding so that the outside do not get clipped
        // the range starts at 0 because tag "g" is being translated to 10,300
        // We still need to subtract the 10 * 2
        let xAxisRange = [0, width - 20]; // added some padding

        this.axisConf = {
            domain : xAxisDomain,
            range : xAxisRange,
            data : allDates,
        }
    }


    /**
     * queuePathAnimation :schedules the animation of path.
     */
    private queuePathAnimation() {
        let tick: number = this.activeTick;
        setTimeout(() => this.scheduleProcess(
            this.setTimelinePathCoor.bind( this, tick), 
            this.timelinePathDirective, 
            "keypress-down"
        ), 0);
    }
    /**
     * set the animated paths coordinates. two points
     * @param tick the scale postion from d3 axis tick
     */
    private setTimelinePathCoor(
        tick: number
    ): void {
        let x2 = this.timelineXAxisDirective.getActiveTickPosition(tick);
        this.pathConf = {xCoor: [[0, 0], [x2, 0]]};
    }

    /**
     * queueShapeAnimation :schedules the animation of a shape
     */
    private queueShapeAnimation(build: Boolean) {
        build = build || false;
        let tick = this.activeTick;
        if(build) {
            setTimeout(() => this.scheduleProcess(
                this.setTimelineShapeConf.bind(this, tick),
                this.timelineShapeDirective,
                "Open bubble"
            ),0);
        } else {
            // Unset the bubble
            setTimeout(() => {
                this.scheduleProcess(
                    this.timelineShapeDirective.unRender.bind(this.timelineShapeDirective),
                    this.timelineShapeDirective, "Close bubble"
                );},0);
        }
    }
    /**
     * set the animated shape
     * @param tick the scale postion from d3 axis tick
     */
    private setTimelineShapeConf(tick: number): void {
        let {x, y} = {x:this.pathConf.xCoor[1][0], y:0};
        let {width, height} = this.config.getRectDim(tick);
        this.shapeConf = {
            origin: [x,y],
            rect: {
                width: width,
                height: height
            }
        };
    }

    /**
     * queueShowMessage :schedules the animation of the message
     */
    private queueShowMessage(): void {
        let tick = this.activeTick;
        setTimeout(() => this.scheduleProcess(
            this.setMessage.bind(this, tick),
            this.timelineMessageComponent, 
            "Set Message"
        ),0);
    }
    private hideMessage(): void{
        setTimeout(() => this.scheduleProcess(
            () => {this.selectedMessage = ""},
                this.timelineMessageComponent, 
            "Unset Message"
        ),0);
    }
    private setMessage(tick: number): void {
        // get location of shape
        this.messagePosition = this.timelineShapeDirective.boundingClientRect;
        this.selectedMessage = this.config.getMessage(tick);
    }

    private goToTick(event: any) {
        let current = this.activeTick;
        this.activeTick = event;
        if(current != this.activeTick) {
            // if active bubble, destruct
            if(this.timelineShapeDirective.isVisible()) {
                this.hideMessage();
                this.queueShapeAnimation(false);
            }
            this.queuePathAnimation();
            this.queueShapeAnimation(true);
            this.queueShowMessage();
        }
    }

    /**
     * controlFlow :controls the execution and garbage collection of queued events.
     * - most queue events are animations that come from directives.
     * Directives need to signal controlFlow once completed with their task.
     * - animation events are synchronous
     */
    private controlFlow(event: any) {
        let {action, signature} = event;
        if(signature) {
            switch(action){
                case 'start':
                    break;
                case 'interrupt':
                    this.unsetFromQueue(signature);
                break;
                case 'end':
                    // remove from queue tracker
                    this.unsetFromQueue(signature);
                // call next event if available
                setTimeout(()=>{this.callFIFO()},0);
                break;
                default:
                    break;
            }
        }
    }
    private queueProcess(obj: any): void {
        this.renderingQueue.push(obj);
    }
    private scheduleProcess(obj: any, target: any, name: string): void {
        setTimeout(()=>{
            // register to process
            //
            // sig is just an incremented number.
            // thoughts were that I can create unique has to distinguish this
            // object from other similar requests. I believe that incrementing the
            // sig property should satisfy enough difference.
            let signature = {target: target, sig: this.eventCounter++};
            this.processQueue.push({callback: obj, sig: signature});
            this.queueProcess(signature);

            // if this is the only item, then execute it
            // all others will be executed by this.controlFlow
            if(this.renderingQueue.length == 1) {
                this.callFIFO();
            }
        },0);
    }
    private callFIFO(): void {
        if(this.processQueue.length > 0){
            let {callback, sig} = this.processQueue.shift();
            this.observable.next(sig);
            setTimeout(()=>{callback.call();},0);
        }
    }
    private unsetFromQueue(obj: any):void {
        let flatten = (item, acc) => item.reduce(((accumulator, currentValue) => {
            currentValue === obj ? null : accumulator.push(currentValue);
            return accumulator
        }), acc);
        this.renderingQueue = flatten(this.renderingQueue, []);
    }

}

export interface controlFlow {
    action: string;
    signature: Object;
}
