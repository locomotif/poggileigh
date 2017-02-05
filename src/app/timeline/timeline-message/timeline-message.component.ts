import { 
    Component, 
    EventEmitter,
    ElementRef,
    Input,
    Output,
    OnInit,
    OnChanges,
    OnDestroy,
} from '@angular/core';

import { controlFlow } from '../index';
import * as d3 from "d3/index";

@Component({
    selector: 'app-timeline-message',
    templateUrl: './timeline-message.component.html',
    exportAs: "timelineMessage",
    styleUrls: ['./timeline-message.component.scss']
})
export class TimelineMessageComponent implements  OnInit, OnChanges, OnDestroy {

    @Input("myMessage") 
    private message: string;

    @Input("myPosition") 
    private position: any;

    @Input("myTranslate") private translate: number[]  = [0,0];

    @Input("myObservable") observable: any ;
    private subscription: any;
    private observer: any;
    private signature: any;

    @Output("timelineMessageControlFlow") transitionCycle: EventEmitter<controlFlow> = new EventEmitter<controlFlow>();

    private initialized: Boolean = false;

    constructor(
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

    ngOnInit() {
    }

    ngOnChanges(prop) {
        if (!this.initialized) {
            this.subscription = this.observable.subscribe(this.observer);
            this.initialized = true;
        } else if (prop.message) {
            this.render();
        }
    }

    ngOnDestroy() {
        if(typeof this.subscription !== "undefined") {
            this.subscription.unsubscribe();
        }
    }

    private render(): void {
        let padding = 10;
        let {width, height, top, right, left, bottom } = this.position;
        top = this.translate[1] + top + padding;
        left = this.translate[0] + padding + left;
        height = height - 2 * padding;
        width = width - 2 * padding;

        d3.select(this.el.nativeElement).select("div")
        .style("width", width + "px")
        .style("height", height + "px")
        .style("top", top + "px")
        .style("left", left + "px")
        .transition("timeline-message")
        .duration(100)
        .ease(d3.easeLinear)
        .style("color", this.message.length > 0 ? "white" : "transparent")
        .on("start", this.transitionEvents.bind(this, "start"))
        .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
        .on("end", this.transitionEvents.bind(this, "end")) ;
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
