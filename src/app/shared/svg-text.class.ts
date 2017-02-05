import { ElementRef, Renderer, Injectable, ViewChild, OnInit,AfterViewInit } from '@angular/core';

import * as d3 from "d3/index";

interface TextConstructor {
    new (conf: TextConfig, renderer: Renderer, el: ElementRef): TextContainer;
}

// @todo make some of these optional
interface TextConfig {
    id: string;

    top: number;
    right: number;
    bottom: number;
    left: number;

    width: number;
    height: number;
    message: string;

    duration?: number;
}

interface TextContainer {
    state: number;
    render(): TextContainer;
}

/*
 * abandoning using d3js text to add text to my svg bubbles. Going to use javascript with transform
 */
class Generic implements TextContainer {

    state: number;

    private text: any;

    constructor(
        private conf: TextConfig,
        private renderer: Renderer,
        private el: ElementRef
    ) {
            /*
            this.text = this.context.append("text")
            .attr("fill", "transparent")
            .attr(this.conf.attr,"")
            .attr("x", this.conf.left)
            .attr("y", this.conf.top);
            */
    }

    render(transition?: any): TextContainer {
        transition = transition || false;
        if(transition) {
            this.text
            .text(this.conf.message)
            .transition(transition)
            .attr("fill","red")
            .attr("x", 300)
            .attr("y", 300);
        } else {
            this.text
            .text(this.conf.message);
        }
        return this;
    }

    unRender(transition?: any): TextContainer {
        if(transition) {
            this.text
            .transition(transition)
            .attr("fill","transparent")
            .attr("x", this.conf.left)
            .attr("y", this.conf.top);
        } else {
            this.text
            .text();
        }
        return this;
    }
}

class HtmlText implements TextContainer {

    state: number;

    private text: any;
    private padding: number = 10;

    constructor(
        private conf: TextConfig,
        private renderer: Renderer,
        private el: ElementRef
    ) {
        this.text = this.renderer.createElement(this.el.nativeElement.parentNode, "div")
        this.renderer.setElementClass(this.text, 'text-container', true);
        for(let i in this.conf) {
            switch(i) {
                case "height":
                case "width":
                    this.conf[i] -= this.padding * 2;
                    break;
                case "top":
                case "left":
                    this.conf[i] += this.padding;
                    break;
                case "bottom":
                case "right":
                    this.conf[i] -= this.padding;
                    break;
                default:
                    break;
            }
        }
        let {top, right, left, bottom, width, height} = this.conf;

        this.renderer.setElementStyle(this.text, "position", "absolute" );

        // Size
        this.renderer.setElementStyle(this.text, "width", String(width) + "px" );
        this.renderer.setElementStyle(this.text, "height", String(height) + "px" );
        
        // Location
        this.renderer.setElementStyle(this.text, "top", String(top) + "px" );
        this.renderer.setElementStyle(this.text, "right", String(right) + "px" );
        this.renderer.setElementStyle(this.text, "bottom", String(bottom) + "px" );
        this.renderer.setElementStyle(this.text, "left", String(left) + "px" );

        this.renderer.setElementStyle(this.text, "color", "transparent" );

        this.renderer.createText(this.text, this.conf.message);
    }


    render(): TextContainer {
        // transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];
        this.renderer.setElementStyle(
            this.text, 
            "transition",
            "color 2s ease-in-out"
        );
        this.renderer.setElementStyle(this.text, "color", "white" );
        return this;
    }

    unRender(): TextContainer {
        // transition: [transition-property] [transition-duration] [transition-timing-function] [transition-delay];
        this.renderer.setElementStyle(
            this.text, 
            "transition",
            "color 0.1s ease-in-out"
        );
        this.renderer.setElementStyle(this.text, "color", "transparent" );
        return this;
    }
}


class TextContainer {

    static texts: TextContainer[] = [];
    public static register (
        id: string,
        text: TextContainer
    ) {
        if(typeof this.texts[id] === "undefined") {
            this.texts[id] = text;
        } else {
            throw new Error("Cannot register text with id: " + id +". That id already exists");
        }
    }

    public static textExists(id: string): Boolean {
        return typeof this.texts[id] === "undefined" ? false : true;
    }

    public static getText(id: string): TextContainer {
        if(typeof this.texts[id] !== "undefined") {
            return this.texts[id];
        } else {
            throw new Error("Svg Text doesn't exist for id: " + id);
        }
    }

    public static destroy() {
        let obj: any;
        do {
            obj = TextContainer.texts.pop();
            obj = null;
        } while (TextContainer.texts.length > 0)
        TextContainer.texts = [];
    }
}

/* 
 * Text Factory
 */
@Injectable()
export class TextBoxService {

    @ViewChild("appTimeline") child;

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ){}

    ngAfterViewInit() {
        console.log(this.child);
    }

    ngOnInit() {
        console.log("onInit");
    }

    getText(
        ctor: string, 
        conf: TextConfig
    ): TextContainer {
        // @todo make index less restrictive
        let index = conf.id ;
        if (!TextContainer.textExists(index)) {
            let text: TextContainer;
            switch(ctor.toLowerCase()) {
                case 'generic':
                    text = new Generic(conf, this.renderer, this.el);
                break;
                case 'htmltext':
                    text = new HtmlText(conf, this.renderer, this.el);
                break;
                default:
                    throw new Error(ctor + " doesn't exist");
            }
            TextContainer.register(index, text);
        }
        return TextContainer.getText(index);
    }

    destroy(): void {
        TextContainer.destroy();
    }
}

