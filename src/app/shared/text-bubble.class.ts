import { Injectable, Renderer, ElementRef } from '@angular/core';

import * as d3 from "d3/index";
import { TextBoxService } from "./svg-text.class";

/*
 * states in d3-transition
 */
const state = Object.freeze({
    CREATED : 0,
    SCHEDULED : 1,
    RENDERING : 2,
    RENDERED : 4,
    UNRENDERED : 5,
    INTERRUPT : 6
});

interface BubbleTextConstructor {
    new (conf): TextBubble;
}

// @todo make some of these optional
interface TextBubbleConfig {
    svg: any; 
    startX: number;
    startY: number;
    attr: string;
    message?: string;
    rect? : {
        width?: number;
        height?: number;
    };
}

interface TextBubble {
    state: number;
    render(): TextBubble;
    unRender(): TextBubble;
    updateSvgDim(): TextBubble;
    domState(): TextBubble;
}

class D3Bubble implements TextBubble {

    state: number;

    private visibility: number = 0;
    private line: any;
    private path: any;
    private group: any;
    private svg: any;
    private transitionState: any;
    private transition: any;
    private duration: number = 500;
    private message: any;

    private data: number[][];

    constructor(
        private id: string,
        private conf: TextBubbleConfig,
        private txt: TextBoxService
    ) {
        if(typeof this.svg === "undefined") {
            this.svg = this.conf.svg.append("svg")
            .attr(this.conf.attr,"")
            .classed("bubble-container", true);

            this.group = this.svg.append("g")
            .attr(this.conf.attr,"");

            // append path
            this.path = this.group
            .append("path")
            .attr(this.conf.attr,"")
            .classed("d3-bubble", true);

            // append message
            if(typeof this.conf.message != "undefined") {
                let {top, right, bottom, left} = this.getCurrentDims();
                this.message = this.txt.getText(
                    "HtmlText",
                    {
                        id: this.id,
                        left: left,
                        top: top,
                        bottom: bottom,
                        right: right,
                        width: right - left,
                        height: bottom - top,
                        message: this.conf.message,
                        duration: 5000,
                    }
                );
            }

            // initialize path "d" attribute
            this.initPath();
        }
    }

    private getCurrentDims() {

        let width = 1 * this.conf.svg.style("width").replace(/px/,"");
        let height = 1 * this.conf.svg.style("height").replace(/px/,"");


        let offset = 10;
        let margin = 10;
        let radius = 10;

        let rectW = width - margin * 2 < 400 ? width - margin * 2 : 400;
        let rectH = height - offset * 2 < 200 ? height - offset * 2 : 200;

        // position of tick
        let startX = this.conf.startX;
        let startY = this.conf.startY;
        let right: number;
        let left: number;

        // get dims from smallest width
        if (startX < width/2) {
            left = startX - margin < rectW /2 ? margin : startX - rectW / 2;
            right = left + rectW;
        } else {
            right = width - startX - margin < rectW /2 ? width - margin : startX + rectW / 2;
            left = right - rectW;
        }
        let top = startY - rectH - offset;
        let bottom = startY - offset;

        return {
            width: width,
            height: height,

            top: top,
            bottom: bottom,
            left: left,
            right: right,

            margin: margin,
            offset: offset,
            radius: radius,
        };

    }

    render(): TextBubble {
        /*
         * Before rendering make sure all other bubbles have been un-rendered.
         * use the TextBubbleContainer to iterate through all bubbles an trigger
         * their un-render when state = 4
         */
        this.state = state.SCHEDULED;

        let { width, height, top, bottom, left, right, margin, offset, radius } = this.getCurrentDims();
        let rect = d3.path();
        // start point
        rect.moveTo( this.conf.startX, this.conf.startY);
        //stem up
        rect.lineTo( this.conf.startX, bottom);
        // line to right
        rect.lineTo( right - radius, bottom);
        // arc up
        rect.arcTo( right, bottom, right, bottom - radius, radius);
        // line up
        rect.lineTo( right, top + radius);
        // arc left
        rect.arcTo( right, top, right - radius, top, radius);
        // line left
        rect.lineTo( left + radius, top);
        // arc down
        rect.arcTo( left, top, left, top + radius, radius);
        // line down
        rect.lineTo( left, bottom - radius);
        // arc right
        rect.arcTo( left, bottom, left + radius, bottom, radius);
        // line back to origin
        rect.lineTo( this.conf.startX, bottom);
        rect.closePath();

        // set fresh transition object
        this.setTrans();
        this.path
            .transition(this.transition)
            .attr("d", rect.toString())
            .style("fill", "#232323")
            .on("start", this.transitionEvents.bind(this, "start"))
            .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
            .on("end", this.transitionEvents.bind(this, "end")) ;
        return this;
    }

    unRender(): TextBubble {
        this.state = state.SCHEDULED;
        this.resetPath();
        return this;
    }

    private transitionEvents(type: string) {
        let bubbleVisibilityAttr = function(elem: any[], value) {
            for(let i in elem) {
                d3.select(elem[i]).attr("bubble-visibility", value);
            }
        };
        switch(type) {
            case "start":
                // change visibility flag so that it is not hidden by css
                if(typeof arguments[3] !== "undefined") {
                    bubbleVisibilityAttr(arguments[3], 1);
                }
                if(this.message){
                    if(this.visibility === 0) {
                        this.message.render();
                    } else { 
                        this.message.unRender();
                    }
                }
                this.state = state.RENDERING;
                break;
            case "interrupt":
                // change visibility flag so that it is hidden by css
                if(typeof arguments[3] !== "undefined") {
                    bubbleVisibilityAttr(arguments[3], 0);
                }
                this.state = state.INTERRUPT;
                break;
            case "end":
                // Depending on visibility we know if item visible or suppressed
                if(this.visibility === 0) {
                    this.state = state.RENDERED; 
                    this.visibility = 1; 
                } else { 
                    this.state = state.CREATED; 
                    this.visibility = 0; 
                }
                if(typeof arguments[3] !== "undefined") {
                    bubbleVisibilityAttr(arguments[3], this.visibility);
                }
                break;
            default:
                break;
        }
    }

    private initPath(transition?: Boolean): any {
        transition = transition || false;
        let startX: number, startY: number, top: number, right: number, bottom: number, left: number, radius: number;

        startX = right = left = this.conf.startX;
        startY = top = bottom = this.conf.startY;
        radius = 1;

        let rect = d3.path();
        // start point
        rect.moveTo( startX, startY);
        //stem up
        rect.lineTo( startX, bottom);
        // line to right
        rect.lineTo( right - radius, bottom);
        // arc up
        rect.arcTo( right, bottom, right, bottom - radius, radius);
        // line up
        rect.lineTo( right, top + radius);
        // arc left
        rect.arcTo( right, top, right - radius, top, radius);
        // line left
        rect.lineTo( left + radius, top);
        // arc down
        rect.arcTo( left, top, left, top + radius, radius);
        // line down
        rect.lineTo( left, bottom - radius);
        // arc right
        rect.arcTo( left, bottom, left + radius, bottom, radius);
        // line back to origin
        rect.lineTo( startX, bottom);
        rect.closePath();

        if(transition) {
            // set fresh transition object
            this.setTrans();
            this.path
                .transition(this.transition)
                .attr("d", rect.toString())
                .style("fill", "transparent")
                .on("start", this.transitionEvents.bind(this, "start"))
                .on("interrupt", this.transitionEvents.bind(this, "interrupt"))
                .on("end", this.transitionEvents.bind(this, "end")) ;
            } else {
                this.path
                    .style("fill", "transparent")
                    .attr("d", rect.toString());
                this.state = state.CREATED; 
                this.visibility = 0; 
            }
    }

    /*
     * alias for initPath()
     */
    private resetPath() {
        this.initPath(true);
    }

    updateSvgDim(): TextBubble {
        return this;
    }

    private setTrans() {
        /* instantiate transition */
        this.transition = d3.transition("bubble-trans")
        .duration(this.duration)
        .ease(d3.easeLinear);
    }

    domState(): TextBubble {
        return this;
    }

}

/*
 * Bubble Container is a class that will contain any already generated bubble
 * by the bubble factory.
 *
 * We can trigger events on all bubbles or a particular bubble
 */
class TextBubbleContainer {

    public static bubbles: TextBubble[] = [];
    public static registerBubble (
        id: string,
        bubble: TextBubble
    ){
        if(typeof TextBubbleContainer.bubbles[id] === "undefined") {
            TextBubbleContainer.bubbles[id] = bubble;
        } else {
            throw new Error("Cannot register bubble with id: " + id +". That id already exists");
        }
    }

    public static bubbleExists(id: string): Boolean {
        return typeof TextBubbleContainer.bubbles[id] === "undefined" ? false : true;
    }

    public static getBubble(id: string): TextBubble {
        if(typeof TextBubbleContainer.bubbles[id] !== "undefined") {
            return TextBubbleContainer.bubbles[id].domState();
        } else {
            throw new Error("Bubble doesn't exist for id: " + id);
        }
    }
    public static destroy() {
        let obj: any;
        do {
            obj = TextBubbleContainer.bubbles.pop();
            obj = null;
        } while (TextBubbleContainer.bubbles.length > 0)
        TextBubbleContainer.bubbles = [];
    }
}

class TextBubbleScheduler extends TextBubbleContainer {
    private state: number;

    public static queue() {
    }
    public static isAnyRendering(): Boolean {
        for(let i in TextBubbleContainer.bubbles) {
            if(TextBubbleContainer.bubbles[i].state === state.RENDERING || TextBubbleContainer.bubbles[i].state === state.SCHEDULED)
                return true;
        }
        return false;
    }
    public static removeRendered(): void {
        for(let i in TextBubbleContainer.bubbles) {
            if(TextBubbleContainer.bubbles[i].state === state.RENDERED)
                TextBubbleContainer.bubbles[i].unRender();
        }
    }
    public static destroy() {
        TextBubbleContainer.destroy();
    }
}

/* 
 * Text Bubble Factory 
 */
@Injectable()
export class TextBubbleService {

    constructor(
        private el: ElementRef,
        private renderer: Renderer,
        private txt: TextBoxService
    ){}

    getBubble(
        ctor: string, 
        conf: TextBubbleConfig
    ): TextBubble {
        let index = "_" + Math.round(conf.startX);
        if (!TextBubbleScheduler.bubbleExists(index)) {
            let bubble: TextBubble;
            switch(ctor.toLowerCase()) {
                case 'd3bubble':
                    bubble = new D3Bubble(index, conf, this.txt);
                    break;
                default:
                    throw new Error(ctor + " doesn't exist");
            }
            TextBubbleScheduler.registerBubble(index, bubble);
        }
        return TextBubbleScheduler.getBubble(index);
    }
    removeRendered(): void {
        TextBubbleScheduler.removeRendered();
    }
    isAnyRendering(): Boolean {
        let test = TextBubbleScheduler.isAnyRendering();
        return test;
    }
    destroy(): void {
        TextBubbleScheduler.destroy();
        this.txt.destroy();
    }
}

